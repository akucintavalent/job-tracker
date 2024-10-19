import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ nullable: true })
  deletedAt: string;
}
