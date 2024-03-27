import { BadRequestException, Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { BoardColumn } from '../board-columns/entities/board-column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';
import { Board } from 'src/boards/entities/board.entity';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationsRepository: Repository<JobApplication>,
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async findBy(columnId: string, userId: string): Promise<JobApplication[]> {
    const boadColumn = await this.boardColumnsRepository.findOne({
      where: { id: columnId },
      relations: { board: true, jobApplications: true },
    });

    const boardId = boadColumn.board.id;
    if (!(await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } }))) {
      throw new BadRequestException("Board Column doesn't exists");
    }

    return boadColumn.jobApplications;
  }

  async create(dto: CreateJobApplicationDto, userId: string): Promise<JobApplication> {
    const boadColumn = await this.boardColumnsRepository.findOne({
      where: { id: dto.columnId },
      relations: { board: true },
    });

    if (!boadColumn) {
      throw new BadRequestException("Board Column doesn't exists");
    }

    const boardId = boadColumn.board.id;
    if (!(await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } }))) {
      throw new BadRequestException("Board Column doesn't exists");
    }

    const entity = this.jobApplicationsRepository.create({
      title: dto.title,
      companyName: dto.companyName,
      description: dto.description,
      column: { id: dto.columnId },
    });

    return await this.jobApplicationsRepository.save(entity);
  }

  async update(id: string, dto: UpdateJobApplicationDto, userId: string): Promise<JobApplication> {
    // Checks wherther JobApplication exists for the current user
    await this.findOne(id, userId);

    const entity = await this.jobApplicationsRepository.findOne({
      where: { id },
      relations: { column: true },
    });

    // Updates the column_id field
    if (dto.columnId && entity.column.id !== dto.columnId) {
      if (!(await this.boardColumnsRepository.existsBy({ id: dto.columnId }))) {
        throw new BadRequestException(`Board Column with '${dto.columnId}' id doesn't exists`);
      }
      entity.column.id = dto.columnId;
    }
    // Updates the rest fields
    Object.assign(entity, dto);

    return this.jobApplicationsRepository.save(entity);
  }

  async delete(id: string, userId: string) {
    const entity = await this.findOne(id, userId);
    return this.jobApplicationsRepository.delete(entity);
  }

  private async findOne(jobId: string, userId: string): Promise<JobApplication> {
    const entity = await this.jobApplicationsRepository
      .createQueryBuilder('job')
      .innerJoin(BoardColumn, 'column', 'column.id = job.column_id')
      .innerJoin(Board, 'board', 'board.id = column.board_id')
      .where('board.user_id = :userId', { userId })
      .getOne();

    if (entity == null)
      throw new BadRequestException(`Job Application with '${jobId}' id doesn't exists`);

    return entity;
  }
}
