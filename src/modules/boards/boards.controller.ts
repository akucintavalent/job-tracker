import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardsService } from './boards.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindBoardDto } from './dtos/find-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { BoardMapper } from './boards.mapper';
import { BoardDto } from './dtos/board.dto';
import { AuthUser } from '../auth/user.decorator';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly mapper: BoardMapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new board for user' })
  @ApiResponse({ status: 200, description: 'Board created', type: BoardDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'User not found' })
  async createBoard(@Body() boardDto: CreateBoardDto, @AuthUser() user: AuthUserDto) {
    const entity = await this.boardsService.create(boardDto, user.userId);
    return this.mapper.toDto(entity);
  }

  @Get()
  @ApiOperation({
    summary: "Gets all user's boards.",
    description:
      'Gets all boards and/or filters them by `name`. `columns` property excluded from reponse body.',
  })
  @ApiResponse({ status: 200, description: 'Board records', type: [BoardDto] })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiQuery({ name: 'name', description: 'Board name', required: false })
  async findBoards(@Query() query: FindBoardDto, @AuthUser() user: AuthUserDto) {
    const entities = await this.boardsService.findBy(query, user.userId);
    return entities.map(this.mapper.toDto);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Gets a single board with all `Columns` and `JobApplications`.',
  })
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiResponse({ status: 200, description: 'Board record', type: BoardDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async findBoard(@Param('id', ParseUUIDPipe) id: string, @AuthUser() user: AuthUserDto) {
    const entity = await this.boardsService.findOne(id, user.userId);
    return this.mapper.toDto(entity);
  }

  @Patch('/:id')
  @ApiOperation({ summary: "Updates user's board" })
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiResponse({ status: 200, description: 'Board updated', type: BoardDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Board not found' })
  async updateBoard(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateBoardDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.boardsService.update(id, body, user.userId);
    return this.mapper.toDto(entity);
  }

  @Delete('/:id')
  @ApiOperation({ summary: "Delete user's board" })
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiOperation({ summary: 'Delete board' })
  @ApiResponse({ status: 200, description: 'Board deleted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async deleteBoard(@Param('id', ParseUUIDPipe) id: string, @AuthUser() user: AuthUserDto) {
    await this.boardsService.remove(id, user.userId);
  }
}
