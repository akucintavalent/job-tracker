import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BoardColumnsService } from './board-columns.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBoardColumnDto } from './dtos/create-board-column.dto';
import { UpdateBoardColumnDto } from './dtos/update-board-column.dto';

@ApiTags('board-columns')
@Controller('board-columns')
export class BoardColumnsController {
  constructor(private readonly boardColumnsService: BoardColumnsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new column for a board' })
  @ApiResponse({ status: 200, description: 'Column created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Board not found' })
  async createBoard(@Body() boardDto: CreateBoardColumnDto) {
    return await this.boardColumnsService.create(boardDto);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiOperation({ summary: `Fetch all board's column` })
  @ApiResponse({ status: 200, description: 'Column records' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  findColumns(@Param('id', ParseUUIDPipe) boardId: string) {
    return this.boardColumnsService.findColumns(boardId);
  }

  @Put('/:id/rearange')
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiBody({
    description: 'List all Column IDs for this Board in the desired order',
    type: [String],
  })
  @ApiOperation({ summary: `Rearange all columns for this Board` })
  @ApiResponse({ status: 200, description: 'Columns rearanged' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async rearange(@Param('id', ParseUUIDPipe) boardId: string, @Body() columnIds: string[]) {
    await this.boardColumnsService.rearangeColumns(boardId, columnIds);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'Column id' })
  @ApiOperation({ summary: `Update column` })
  @ApiResponse({ status: 200, description: 'Column updated' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Column not found' })
  async updateBoard(
    @Param('id', ParseUUIDPipe) columnId: string,
    @Body() body: UpdateBoardColumnDto,
  ) {
    return await this.boardColumnsService.update(columnId, body);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Column id' })
  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 200, description: 'Column deleted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  deleteBoard(@Param('id', ParseUUIDPipe) columnId: string) {
    return this.boardColumnsService.remove(columnId);
  }
}
