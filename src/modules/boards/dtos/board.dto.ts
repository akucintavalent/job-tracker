import { ApiProperty } from '@nestjs/swagger';
import { BoardColumnDto } from '../../board-columns/dtos/board-column.dto';
import { BaseDto } from '../../../dtos/base.dto';

export class BoardDto extends BaseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isArchived: boolean;

  @ApiProperty({ type: [BoardColumnDto] })
  columns: BoardColumnDto[];
}
