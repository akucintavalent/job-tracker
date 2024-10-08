import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {
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
