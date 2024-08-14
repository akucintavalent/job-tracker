import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardMapper } from './boards.mapper';
import { BoardDto } from './dtos/board.dto';
import { AuthUser } from '../auth/user.decorator';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';

@ApiTags('boards-all')
@Controller('boards-all')
export class BoardsAllController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly mapper: BoardMapper,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Gets all boards with all `Columns` and `JobApplications`.',
  })
  @ApiResponse({ status: 200, description: 'Board record', type: [BoardDto] })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async findBoard(@AuthUser() user: AuthUserDto) {
    const entities = await this.boardsService.getAllBoardsWithData(user.userId);
    return entities.map(this.mapper.toDto);
  }
}
