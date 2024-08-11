import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ContactPhoneDto } from './contact-phone.dto';
import { ContactEmailDto } from './contact-email.dto';

export class CreateContactDto {
  @IsString()
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

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  companyName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  companyLocation: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  twitterUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  facebookUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  linkedinUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  githubUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  comment: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  phones: [ContactPhoneDto];

  @ApiProperty({ nullable: true })
  @IsOptional()
  emails: [ContactEmailDto];
}
