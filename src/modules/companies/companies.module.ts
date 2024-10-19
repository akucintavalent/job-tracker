import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { CompanyMapper } from './companies.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Company, JobApplication])],
  providers: [CompaniesService, CompanyMapper],
  controllers: [CompaniesController],
  exports: [CompaniesService],
})
export class CompaniesModule {}
