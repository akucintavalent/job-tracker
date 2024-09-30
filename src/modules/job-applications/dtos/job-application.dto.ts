import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../dtos/base.dto';
import { JobApplicationNoteDto } from 'src/modules/job-application-notes/dtos/job-application-note.dto';

export class JobApplicationDto extends BaseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ type: 'string', format: 'uuid' })
  columnId: string;

  @ApiProperty({ nullable: true })
  notes: JobApplicationNoteDto[] | null;

  @ApiProperty()
  postUrl: string;

  @ApiProperty()
  salary: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  deadline: string;
}
