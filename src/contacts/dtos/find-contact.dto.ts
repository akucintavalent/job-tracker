import { IsOptional, IsUUID } from 'class-validator';

export class FindContactDto {
  @IsUUID()
  @IsOptional()
  contactId?: string;

  @IsUUID()
  @IsOptional()
  boardId?: string;
}
