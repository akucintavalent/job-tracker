import { BadRequestException, Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { BoardColumn } from '../board-columns/entities/board-column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';

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

  async create(dto: CreateJobApplicationDto) {
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

  async update(id: string, dto: UpdateJobApplicationDto) {
    const entity = await this.findOne(id);

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

  async delete(id: string) {
    const entity = await this.findOne(id);
    return this.jobApplicationsRepository.delete(entity);
  }

  private async findOne(id: string): Promise<JobApplication> {
    const entity = await this.jobApplicationsRepository.findOne({
      where: { id },
      relations: { column: true },
    });

    if (entity == null)
      throw new BadRequestException(`Job Application with '${id}' id doesn't exists`);
    return entity;
  }
}
