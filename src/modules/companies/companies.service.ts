import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { ExceptionMessages } from '../../exceptions/exception-messages';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    @InjectRepository(JobApplication)
    private readonly jobApplicationsRepository: Repository<JobApplication>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: AuthUserDto) {
    if (createCompanyDto.jobApplicationId) {
      await this.jobApplicationBelongsToUser(createCompanyDto.jobApplicationId, user.userId);
    }

    const companyEntity = this.companiesRepository.create({
      ...createCompanyDto,
      ...(createCompanyDto?.jobApplicationId && {
        jobApplication: { id: createCompanyDto?.jobApplicationId },
      }),
    });

    const { id: companyId } = await this.companiesRepository.save(companyEntity);

    return this.findOne(companyId, user);
  }

  async findOne(companyId: string, { userId }: AuthUserDto) {
    const company = await this.companiesRepository.findOne({
      where: {
        id: companyId,
      },
      relations: { jobApplication: true },
    });

    if (company.jobApplication) {
      await this.jobApplicationBelongsToUser(company.jobApplication.id, userId);
    }

    if (!company) {
      throw new NotFoundException(ExceptionMessages.doesNotExist(Company.name));
    }

    return company;
  }

  async update(companyId: string, updateCompanyDto: UpdateCompanyDto, user: AuthUserDto) {
    const company = await this.findOne(companyId, user);

    Object.assign(company, updateCompanyDto);

    await this.companiesRepository.save(company);

    return this.findOne(companyId, user);
  }

  async remove(companyId: string, user: AuthUserDto) {
    const company = await this.findOne(companyId, user);

    return this.companiesRepository.remove(company);
  }

  // Helpers

  private async jobApplicationBelongsToUser(jobApplicationId: string, userId: string) {
    const jobApplicationExists = await this.jobApplicationsRepository.existsBy({
      id: jobApplicationId,
      column: {
        board: {
          user: {
            id: userId,
          },
        },
      },
    });

    if (!jobApplicationExists) {
      throw new NotFoundException(
        'Cannot find JobApplication with given id that belong to the given user',
      );
    }
  }
}
