import { IsUUID } from 'class-validator';

export class FindContactDto {
  @IsUUID()
  boardId?: string;
}
