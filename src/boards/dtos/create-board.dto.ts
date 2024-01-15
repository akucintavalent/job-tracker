import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  userId: string;
}
