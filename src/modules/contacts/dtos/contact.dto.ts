import { ApiProperty } from '@nestjs/swagger';
import { BoardDto } from '../../boards/dtos/board.dto';
import { JobApplicationDto } from '../../job-applications/dtos/job-application.dto';
import { ContactEmailDto } from './contact-method/contact-email.dto';
import { ContactPhoneDto } from './contact-method/contact-phone.dto';
import { BaseDto } from '../../../dtos/base.dto';

export class ContactDto extends BaseDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  jobTitle: string;

  @ApiProperty()
  board: BoardDto;

  @ApiProperty()
  jobApplications: JobApplicationDto[];

  @ApiProperty()
  emails: ContactEmailDto[];

  @ApiProperty()
  phones: ContactPhoneDto[];

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  companyLocation: string;

  @ApiProperty()
  twitterUrl: string;

  @ApiProperty()
  facebookUrl: string;

  @ApiProperty()
  linkedinUrl: string;

  @ApiProperty()
  githubUrl: string;

  @ApiProperty()
  comment: string;
}
