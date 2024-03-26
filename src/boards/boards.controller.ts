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
import { AuthUser } from 'src/auth/user.decorator';
import { AuthUserDto } from 'src/auth/dtos/auth.user.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardService: BoardsService,
    private readonly mapper: BoardMapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new board for user' })
  @ApiResponse({ status: 200, description: 'Board created', type: BoardDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'User not found' })
  async createBoard(@Body() boardDto: CreateBoardDto, @AuthUser() user: AuthUserDto) {
    const entity = await this.boardService.create(boardDto, user.userId);
    return this.mapper.toDto(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all boards' })
  @ApiResponse({ status: 200, description: 'Board records', type: [BoardDto] })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiQuery({ name: 'id', description: 'Board id', required: false })
  @ApiQuery({ name: 'userId', description: 'User id', required: false })
  @ApiQuery({ name: 'name', description: 'Board name', required: false })
  async findBoards(@Query() query: FindBoardDto, @AuthUser() user: AuthUserDto) {
    const entities = await this.boardService.findBy(query);
    return entities.map(this.mapper.toDto);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiOperation({ summary: 'Fetch board' })
  @ApiResponse({ status: 200, description: 'Board record', type: BoardDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async findBoard(@Param('id', ParseUUIDPipe) id: string, @AuthUser() user: AuthUserDto) {
    const entity = await this.boardService.findOne(id);
    return this.mapper.toDto(entity);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiResponse({ status: 200, description: 'Board updated', type: BoardDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Board not found' })
  async updateBoard(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateBoardDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.boardService.update(id, body);
    return this.mapper.toDto(entity);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Board id' })
  @ApiOperation({ summary: 'Delete board' })
  @ApiResponse({ status: 200, description: 'Board deleted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async deleteBoard(@Param('id', ParseUUIDPipe) id: string, @AuthUser() user: AuthUserDto) {
    await this.boardService.remove(id);
  }
}
