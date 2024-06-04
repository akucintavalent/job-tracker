import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateContactDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  boardId: string;

  @ApiProperty({ nullable: true })
  companyName?: string;

  @ApiProperty({ nullable: true })
  companyLocation?: string;

  @ApiProperty({ nullable: true })
  twiterUrl?: string;

  @ApiProperty({ nullable: true })
  facebookUrl?: string;

  @ApiProperty({ nullable: true })
  linkedinUrl?: string;

  @ApiProperty({ nullable: true })
  githubUrl?: string;

  @ApiProperty({ nullable: true })
  comment?: string;
}
