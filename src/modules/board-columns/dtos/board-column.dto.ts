import { ApiProperty } from '@nestjs/swagger';
import { JobApplicationDto } from '../../job-applications/dtos/job-application.dto';

export class BoardColumnDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  @ApiProperty({ type: 'string', format: 'uuid' })
  boardId: string;

  @ApiProperty({ type: [JobApplicationDto] })
  jobApplications: JobApplicationDto[];
}
