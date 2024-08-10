import { ApiProperty } from '@nestjs/swagger';
import { BoardDto } from '../../boards/dtos/board.dto';
import { JobApplicationDto } from '../../job-applications/dtos/job-application.dto';

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
