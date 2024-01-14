import { IsString, IsUUID, IsOptional } from 'class-validator';

export class FindBoardDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
