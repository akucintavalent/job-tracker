import { ApiProperty } from '@nestjs/swagger';
import { BoardDto } from '../../boards/dtos/board.dto';
import { JobApplicationDto } from '../../job-applications/dtos/job-application.dto';
import { ContactMethodEmailDto } from './contact-method/contact-method-email.dto';
import { ContactMethodPhoneDto } from './contact-method/contact-method-phone.dto';

export class ContactDto {
  @ApiProperty()
  id: string;

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
  emails: ContactMethodEmailDto[];

  @ApiProperty()
  phones: ContactMethodPhoneDto[];

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
