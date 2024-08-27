import { BadRequestException, Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { BoardColumn } from '../board-columns/entities/board-column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';
import { Board } from '../boards/entities/board.entity';
import { ExceptionMessages } from '../../exceptions/exception-messages';
import { ArgumentInvalidException } from '../../exceptions/argument-invalid.exceptions';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationsRepository: Repository<JobApplication>,
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
  ) {}

  async findBy(columnId: string, userId: string): Promise<JobApplication[]> {
    const boardColumnExist = await this.boardColumnsRepository.existsBy({
      id: columnId,
      board: { user: { id: userId } },
    });

    if (!boardColumnExist) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(BoardColumn.name));
    }

    const jobApplicationEntities = await this.jobApplicationsRepository.find({
      where: { column: { id: columnId } },
      relations: { notes: true },
      order: { notes: { order: 'ASC' } },
    });

    return jobApplicationEntities;
  }

  async create(dto: CreateJobApplicationDto, userId: string): Promise<JobApplication> {
    await this.validateBoardColumn(dto.columnId, userId);

    const jobApplication = this.jobApplicationsRepository.create({
      title: dto.title,
      companyName: dto.companyName,
      description: dto.description,
      column: { id: dto.columnId },
    });

    return await this.jobApplicationsRepository.save(jobApplication);
  }

  async update(id: string, dto: UpdateJobApplicationDto, userId: string): Promise<JobApplication> {
    // Checks whether jobApplication exists for the current user
    await this.findOne(id, userId);

    const jobApplication = await this.jobApplicationsRepository.findOne({
      where: { id },
      relations: { column: true },
    });

    // Updates the column_id field
    if (dto.columnId && jobApplication.column.id !== dto.columnId) {
      const boardColumnExists = await this.boardColumnsRepository.existsBy({ id: dto.columnId });
      if (!boardColumnExists) {
        throw new BadRequestException(`Board column with '${dto.columnId}' id doesn't exists`);
      }
      jobApplication.column.id = dto.columnId;
    }
    // Updates the rest fields
    Object.assign(jobApplication, dto);

    return this.jobApplicationsRepository.save(jobApplication);
  }

  async delete(id: string, userId: string) {
    const jobApplication = await this.findOne(id, userId);
    return this.jobApplicationsRepository.delete(jobApplication);
  }

  private async findOne(jobId: string, userId: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationsRepository
      .createQueryBuilder('job')
      .innerJoin(BoardColumn, 'column', 'column.id = job.column_id')
      .innerJoin(Board, 'board', 'board.id = column.board_id')
      .where('board.user_id = :userId', { userId })
      .getOne();

    if (jobApplication == null) {
      throw new BadRequestException(`Job application with '${jobId}' id doesn't exists`);
    }

    return jobApplication;
  }

  private async validateBoardColumn(boardColumnId: string, userId: string) {
    if (!boardColumnId) {
      throw new ArgumentInvalidException(ExceptionMessages.fieldIsRequired('boardColumnId'));
    }

    const boardColumnExists = await this.boardColumnsRepository.existsBy({
      id: boardColumnId,
      board: { user: { id: userId } },
    });

    if (!boardColumnExists) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(BoardColumn.name));
    }
  }
}
