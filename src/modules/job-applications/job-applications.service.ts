import { BadRequestException, Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { BoardColumn } from '../board-columns/entities/board-column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';
import { Board } from 'src/modules/boards/entities/board.entity';

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
    const boardColumn = await this.boardColumnsRepository.findOne({
      where: { id: columnId },
      relations: { board: true, jobApplications: true },
    });

    const boardId = boardColumn.board.id;
    const boardExists = await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } });
    if (!boardExists) {
      throw new BadRequestException("Board column doesn't exists");
    }

    return boardColumn.jobApplications;
  }

  async create(dto: CreateJobApplicationDto, userId: string): Promise<JobApplication> {
    const boardColumn = await this.boardColumnsRepository.findOne({
      where: { id: dto.columnId },
      relations: { board: true },
    });

    if (!boardColumn) {
      throw new BadRequestException("Board column doesn't exists");
    }

    const boardId = boardColumn.board.id;
    const boardExists = await this.boardsRepository.existsBy({
      id: boardId,
      user: { id: userId },
    });
    if (!boardExists) {
      throw new BadRequestException("Board column doesn't exists");
    }

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
}
