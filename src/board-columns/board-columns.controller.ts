import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardColumnsService } from './board-columns.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBoardColumnDto } from './dtos/create-board-column.dto';
import { UpdateBoardColumnDto } from './dtos/update-board-column.dto';

@ApiTags('board-columns')
@Controller('board-columns')
export class BoardColumnsController {
  constructor(private readonly boardColumnService: BoardColumnsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new column for a board' })
  @ApiResponse({
    status: 200,
    description: 'Board created',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 400,
    description: 'User not found',
  })
  async createBoard(@Body() boadDto: CreateBoardColumnDto) {
    return await this.boardColumnService.create(boadDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: `Fetch all board's column` })
  @ApiResponse({
    status: 200,
    description: 'Column records',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  findColumns(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardColumnService.findColumns(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: `Update column` })
  @ApiResponse({
    status: 200,
    description: 'Column updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 400,
    description: 'Column not found',
  })
  async updateBoard(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateBoardColumnDto,
  ) {
    return await this.boardColumnService.update(id, body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({
    status: 200,
    description: 'Column deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  deleteBoard(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardColumnService.remove(id);
  }
}
