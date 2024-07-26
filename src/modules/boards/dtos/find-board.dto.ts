import { IsString, IsOptional } from 'class-validator';

export class FindBoardDto {
  @IsOptional()
  @IsString()
  name?: string;
}
