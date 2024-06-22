import { ApiProperty } from '@nestjs/swagger';
import { BoardColumnDto } from 'src/board-columns/dtos/board-column.dto';

export class BoardDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isArchived: boolean;

  @ApiProperty({ type: [BoardColumnDto] })
  columns: BoardColumnDto[];
}
