import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../dtos/base.dto';

export class CompanyDto extends BaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  description?: string;

  @ApiProperty({ nullable: true })
  url?: string;

  @ApiProperty({ nullable: true })
  industry?: string;

  @ApiProperty({ nullable: true })
  jobApplicationId?: string;
}
