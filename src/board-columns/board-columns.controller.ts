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
import { BoardColumnDto } from './dtos/board-column.dto';
import { BoardColumnMapper } from './board-columns.mapper';
import { AuthUser } from 'src/auth/user.decorator';
import { AuthUserDto } from 'src/auth/dtos/auth.user.dto';

@ApiTags('board-columns')
@Controller('board-columns')
export class BoardColumnsController {
  constructor(
    private readonly boardColumnsService: BoardColumnsService,
    private readonly mapper: BoardColumnMapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new column for a board' })
  @ApiResponse({ status: 200, description: 'Column created', type: BoardColumnDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Board not found' })
  @ApiResponse({ status: 409, description: 'Board Column with that name already exists' })
  async createBoard(@Body() boardDto: CreateBoardColumnDto, @AuthUser() user: AuthUserDto) {
    const entity = await this.boardColumnsService.create(boardDto, user.userId);
    return this.mapper.toDto(entity);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiOperation({ summary: `Fetch all board's column` })
  @ApiResponse({ status: 200, description: 'Column records', type: [BoardColumnDto] })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async findColumns(@Param('id', ParseUUIDPipe) boardId: string, @AuthUser() user: AuthUserDto) {
    const entities = await this.boardColumnsService.findColumns(boardId, user.userId);
    return entities.map((e) => this.mapper.toDto(e));
  }

  @Put('/:id/rearrange')
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiBody({
    description: 'List all Column IDs for this Board in the desired order',
    type: [String],
  })
  @ApiOperation({ summary: `Rearrange all columns for this Board` })
  @ApiResponse({ status: 200, description: 'Columns rearranged' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async rearrange(
    @Param('id', ParseUUIDPipe) boardId: string,
    @Body() columnIds: string[],
    @AuthUser() user: AuthUserDto,
  ) {
    await this.boardColumnsService.rearrangeColumns(boardId, columnIds, user.userId);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'Column id' })
  @ApiOperation({ summary: `Update column` })
  @ApiResponse({ status: 200, description: 'Column updated', type: BoardColumnDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Column not found' })
  async updateBoard(
    @Param('id', ParseUUIDPipe) columnId: string,
    @Body() body: UpdateBoardColumnDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.boardColumnsService.update(columnId, body, user.userId);
    return this.mapper.toDto(entity);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Column id' })
  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 200, description: 'Column deleted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async deleteBoard(@Param('id', ParseUUIDPipe) columnId: string, @AuthUser() user: AuthUserDto) {
    await this.boardColumnsService.remove(columnId, user.userId);
  }
}
