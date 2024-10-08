import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../dtos/base.dto';
import { JobApplicationNoteDto } from 'src/modules/job-application-notes/dtos/job-application-note.dto';
import { BoardColumnDto } from '../../board-columns/dtos/board-column.dto';
import { ContactDto } from '../../contacts/dtos/contact.dto';
import { CompanyDto } from '../../companies/dtos/company.dto';

export class JobApplicationDto extends BaseDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ type: 'string', format: 'uuid' })
  columnId: string;

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

  @ApiProperty({ nullable: true })
  notes: JobApplicationNoteDto[] | null;

  @ApiProperty({ type: () => BoardColumnDto })
  column: BoardColumnDto;

  @ApiProperty({ nullable: true })
  contacts: ContactDto[] | null;

  @ApiProperty({ nullable: true })
  company: CompanyDto | null;
}
