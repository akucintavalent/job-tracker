import { BadRequestException, Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { BoardColumn } from '../board-columns/entities/board-column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardColumnDto } from './dtos/create-job-application.dto';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationsRepository: Repository<JobApplication>,
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
  ) {}

  findBy(columndId: string) {
    return this.jobApplicationsRepository.findBy({ column: { id: columndId } });
  }

  async create(dto: CreateBoardColumnDto) {
    if (!(await this.boardColumnsRepository.existsBy({ id: dto.columnId }))) {
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
}
