import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CompanyDto } from './dtos/company.dto';

@Injectable()
export class CompanyMapper {
  toDto(entity: Company) {
    const dto = new CompanyDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.url = entity.url;
    dto.industry = entity.industry;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.deletedAt = entity.deletedAt;
    dto.jobApplicationId = entity.jobApplication?.id;
    return dto;
  }
}
