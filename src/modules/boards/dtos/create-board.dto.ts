import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  name: string;
}
