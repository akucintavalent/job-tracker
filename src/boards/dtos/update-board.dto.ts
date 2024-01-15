import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty()
  @IsString()
  name?: string;
}
