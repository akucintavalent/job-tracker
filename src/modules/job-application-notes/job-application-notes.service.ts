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

    //this.mapper.toEntity(noteDto)
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

  rearrange() {}

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
}
