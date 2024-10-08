import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateContactDto } from '../../contacts/dtos/create-contact.dto';
import { Type } from 'class-transformer';
import { CreateCompanyDto } from '../../companies/dtos/create-company.dto';
import { CreateJobApplicationNoteDto } from '../../job-application-notes/dtos/create-job-application-note.dto';

export class CreateJobApplicationDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  columnId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  postUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  salary?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  deadline?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts?: CreateContactDto[];

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJobApplicationNoteDto)
  notes?: CreateJobApplicationNoteDto[];

  @ApiProperty({ nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  company?: CreateCompanyDto;
}
