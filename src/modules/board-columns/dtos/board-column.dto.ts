import { ApiProperty } from '@nestjs/swagger';
import { JobApplicationDto } from '../../job-applications/dtos/job-application.dto';
import { BaseDto } from '../../../dtos/base.dto';

export class BoardColumnDto extends BaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  @ApiProperty({ type: 'string', format: 'uuid' })
  boardId: string;

  @ApiProperty({ type: [JobApplicationDto] })
  jobApplications: JobApplicationDto[];
}
