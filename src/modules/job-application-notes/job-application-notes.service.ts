import { Injectable } from '@nestjs/common';
import { JobApplicationNote } from './entities/job-application-note.entity';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { JobApplicationNoteDto } from './dtos/job-application-note.dto';
import { JobApplicationNoteMapper } from './job-application-notes.mapper';
import { CreateJobApplicationNoteDto } from './dtos/create-job-application-note.dto';
import { ArgumentInvalidException } from 'src/exceptions/argument-invalid.exceptions';

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
    await this.validate(noteDto as JobApplicationNoteDto, userId);

    const count = await this.jobApplicationNotesRepository.countBy({
      jobApplication: { id: noteDto.jobApplicationId },
    });

    let entity = this.jobApplicationNotesRepository.create({
      ...noteDto,
      jobApplication: { id: noteDto.jobApplicationId },
    });
    entity.order = count;
    entity = await this.jobApplicationNotesRepository.save(entity);
    return entity;
  }

  async find(jobApplicationId: string, userId: string) {
    await this.validate({ jobApplicationId } as JobApplicationNoteDto, userId);

    return this.jobApplicationNotesRepository.findBy({
      jobApplication: { id: jobApplicationId, column: { board: { user: { id: userId } } } },
    });
  }

  async rearrange(jobApplicationId: string, noteIds: string[], userId: string) {
    await this.validate({ jobApplicationId } as JobApplicationNoteDto, userId);

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

  private async validate(noteDto: JobApplicationNoteDto, userId: string) {
    if (!noteDto.jobApplicationId) {
      throw new ArgumentInvalidException('jobApplicationId is required');
    }

    const isJobApplicationExists = await this.jobApplicationsRepository.existsBy({
      id: noteDto.jobApplicationId,
      column: { board: { user: { id: userId } } },
    });

    if (!isJobApplicationExists) {
      throw new BadRequestException("JobApplication doesn't exists");
    }
  }

  private validateRearrange(columnsIds: string[], dbColumnsIds: string[]) {
    if (!columnsIds.length) {
      throw new BadRequestException('List of column ids is empty');
    }
    if (this.hasDuplicates(columnsIds)) {
      throw new BadRequestException('List has duplicated Id.');
    }
    if (!this.areEquals(columnsIds, dbColumnsIds)) {
      throw new BadRequestException('List must contains all columns from this board.');
    }
  }

  // TODO: create separate (general) function
  private hasDuplicates(array: any[]): boolean {
    const uniqueSet = new Set(array);
    return array.length !== uniqueSet.size;
  }

  private areEquals(array1: any[], array2: any[]): boolean {
    const set1 = new Set(array1);
    const set2 = new Set(array2);
    return set1.size === set2.size && [...set1].every((x) => set2.has(x));
  }
}
