import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateBoardColumnDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  boardId: string;
}
