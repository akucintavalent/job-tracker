import { Body, Controller, Post } from '@nestjs/common';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardsService } from './boards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    await this.boardService.create(boadDto);
  }
}
