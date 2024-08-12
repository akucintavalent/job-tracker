import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ContactMethodPhoneDto } from './contact-method/contact-method-phone.dto';
import { ContactMethodEmailDto } from './contact-method/contact-method-email.dto';
import { Type } from 'class-transformer';

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactMethodPhoneDto)
  phones: ContactMethodPhoneDto[];

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactMethodEmailDto)
  emails: ContactMethodEmailDto[];
}
