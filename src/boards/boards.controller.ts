import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardsService } from './boards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    description: 'UserId is invalid or User not found',
  })
  async createBoard(@Body() boadDto: CreateBoardDto) {
    return await this.boardService.create(boadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiResponse({
    status: 200,
    description: 'User records',
    //type: Board[], // TDOO: findUsers() returns Entity model instead of DTO
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  findUsers(@Query() query: FindBoardDto) {
    return this.boardService.findBy(query);
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
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateBoardDto,
  ) {
    return await this.boardService.update(id, body);
  }
}
