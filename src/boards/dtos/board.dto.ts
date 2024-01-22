import { ApiProperty } from '@nestjs/swagger';

export class BoardDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;
}
