import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../dtos/base.dto';

export class JobApplicationDto extends BaseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ type: 'string', format: 'uuid' })
  columnId: string;
}
