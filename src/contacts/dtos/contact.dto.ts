import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  jobTitle: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  boardId: string;

  @ApiProperty()
  jobApplicationIds: string[];

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  companyLocation: string;

  @ApiProperty()
  twiterUrl: string;

  @ApiProperty()
  facebookUrl: string;

  @ApiProperty()
  linkedinUrl: string;

  @ApiProperty()
  githubUrl: string;

  @ApiProperty()
  comment: string;
}
