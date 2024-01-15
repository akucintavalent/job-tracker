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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindBoardDto } from './dtos/find-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new board for user' })
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
  async createBoard(@Body() boadDto: CreateBoardDto) {
    return await this.boardService.create(boadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all boards' })
  @ApiResponse({
    status: 200,
    description: 'Board records',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiQuery({ name: 'id', description: 'Board id', required: false })
  @ApiQuery({ name: 'userId', description: 'User id', required: false })
  @ApiQuery({ name: 'name', description: 'Board name', required: false })
  findBoards(@Query() query: FindBoardDto) {
    return this.boardService.findBy(query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch board' })
  @ApiResponse({
    status: 200,
    description: 'Board record',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  findBoard(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardService.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Board updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 400,
    description: 'Board not found',
  })
  async updateBoard(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateBoardDto,
  ) {
    return await this.boardService.update(id, body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete board' })
  @ApiResponse({
    status: 200,
    description: 'Board deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  deleteBoard(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardService.remove(id);
  }
}
