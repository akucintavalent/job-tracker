import { Injectable } from '@nestjs/common';
import { JobApplicationNote } from './entities/job-application-note.entity';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { JobApplicationNoteMapper } from './job-application-notes.mapper';
import { CreateJobApplicationNoteDto } from './dtos/create-job-application-note.dto';
import { ArgumentInvalidException } from 'src/exceptions/argument-invalid.exceptions';
import { UpdateJobApplicationNote } from './dtos/update-job-application-note.dto';

@Injectable()
export class JobApplicationNotesService {
  constructor(
    @InjectRepository(JobApplicationNote)
    private readonly jobApplicationNotesRepository: Repository<JobApplicationNote>,
    @InjectRepository(JobApplication)
    private readonly jobApplicationsRepository: Repository<JobApplication>,
    private readonly mapper: JobApplicationNoteMapper,
  ) {}

  async create(noteDto: CreateJobApplicationNoteDto, userId: string) {
    await this.validateJobApplication(noteDto.jobApplicationId, userId);

    const count = await this.jobApplicationNotesRepository.countBy({
      jobApplication: { id: noteDto.jobApplicationId },
    });

    let entity = this.jobApplicationNotesRepository.create({
      ...noteDto,
      jobApplication: { id: noteDto.jobApplicationId },
    });
    entity.order = count;
    entity = await this.jobApplicationNotesRepository.save(entity);
    return this.mapper.toDto(entity);
  }

  async find(jobApplicationId: string, userId: string) {
    await this.validateJobApplication(jobApplicationId, userId);

    const noteEntities = await this.jobApplicationNotesRepository.findBy({
      jobApplication: { id: jobApplicationId, column: { board: { user: { id: userId } } } },
    });

    return noteEntities.map(this.mapper.toDto);
  }

  async update(id: string, dto: UpdateJobApplicationNote, userId: string) {
    let entity = await this.jobApplicationNotesRepository.findOneBy({
      id,
      jobApplication: { column: { board: { user: { id: userId } } } },
    });

    if (!entity) {
      throw new BadRequestException("JobApplicationNote doesn't exists");
    }

    Object.assign(entity, dto);

    entity = await this.jobApplicationNotesRepository.save(entity);
    return this.mapper.toDto(entity);
  }

  async rearrange(jobApplicationId: string, noteIds: string[], userId: string) {
    await this.validateJobApplication(jobApplicationId, userId);

    const noteEntities = await this.jobApplicationNotesRepository.findBy({
      jobApplication: { id: jobApplicationId },
    });

    const noteEntitiesIds = noteEntities.map((x) => x.id);
    this.validateRearrange(noteIds, noteEntitiesIds);

    for (let i = 0; i < noteEntitiesIds.length; i++) {
      noteEntities.find((x) => x.id === noteIds[i]).order = i;
    }

    await this.jobApplicationNotesRepository.upsert(noteEntities, ['id']);
  }

  async delete(id: string, userId: string) {
    const noteEntity = await this.jobApplicationNotesRepository.findOne({
      where: {
        id,
        jobApplication: { column: { board: { user: { id: userId } } } },
      },
      relations: { jobApplication: true },
      order: { order: 'ASC' },
    });

    if (!noteEntity) {
      throw new BadRequestException("JobApplicationNote doesn't exist");
    }

    await this.jobApplicationNotesRepository.softDelete(noteEntity.id);

    await this.rearrangeAfterDelete(noteEntity.jobApplication.id);
  }

  private async validateJobApplication(jobApplicationId: string, userId: string) {
    if (!jobApplicationId) {
      throw new ArgumentInvalidException('jobApplicationId is required');
    }

    const jobApplicationExists = await this.jobApplicationsRepository.existsBy({
      id: jobApplicationId,
      column: { board: { user: { id: userId } } },
    });

    if (!jobApplicationExists) {
      throw new BadRequestException("JobApplication doesn't exist");
    }
  }

  private validateRearrange(columnsIds: string[], dbColumnsIds: string[]) {
    if (!columnsIds.length) {
      throw new BadRequestException('List of column ids is empty');
    }
    if (columnsIds.containsDuplicates()) {
      throw new BadRequestException('List has duplicated Id.');
    }
    if (!columnsIds.equals(dbColumnsIds)) {
      throw new BadRequestException('List must contains all columns from this board.');
    }
  }

  private async rearrangeAfterDelete(jobApplicationId: string) {
    const noteEntities = await this.jobApplicationNotesRepository.find({
      where: { jobApplication: { id: jobApplicationId } },
      order: { order: 'ASC' },
    });

    for (let i = 0; i < noteEntities.length; i++) {
      noteEntities[i].order = i;
    }

    await this.jobApplicationNotesRepository.upsert(noteEntities, ['id']);
  }
}
