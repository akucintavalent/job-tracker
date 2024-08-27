import { BadRequestException, Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from '../users/entities/user.entity';
import { FindBoardDto } from './dtos/find-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { BoardColumnsService } from '../board-columns/board-columns.service';
import { ExceptionMessages } from 'src/exceptions/exception-messages';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly boardsColumnService: BoardColumnsService,
  ) {}

  async create(dto: CreateBoardDto, userId: string): Promise<Board> {
    return this.createDefaultBoard(userId, dto.name);
  }

  async createDefaultBoard(userId: string, boardName: string = null): Promise<Board> {
    if (!(await this.usersRepository.existsBy({ id: userId }))) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(User.name));
    }

    const name = !boardName ? `Job Search ${new Date().getFullYear()}` : boardName;
    let board = this.boardsRepository.create({
      name: name,
      user: { id: userId },
    });

    board = await this.boardsRepository.save(board);
    board.columns = await this.boardsColumnService.createDefaultBoardColumns(board.id, userId);
    return board;
  }

  async findBy(query: FindBoardDto, userId: string): Promise<Board[]> {
    if (!(await this.usersRepository.existsBy({ id: userId }))) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(User.name));
    }

    const boardName = query.name?.length > 0 ? Like(`%${query.name}%`) : null;

    return this.boardsRepository.find({
      where: {
        name: boardName,
        user: { id: userId },
      },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(boardId: string, userId: string): Promise<Board> {
    const board = await this.findBoard(boardId, userId);
    board.columns = await this.boardsColumnService.findColumns(board.id, userId);
    return board;
  }

  async getAllBoardsWithData(userId: string): Promise<Board[]> {
    const boardsEntities = await this.boardsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'ASC' },
    });
    await Promise.all(
      boardsEntities.map(async (board) => {
        board.columns = await this.boardsColumnService.findColumns(board.id, userId);
        return board;
      }),
    );
    return boardsEntities;
  }

  async update(boardId: string, dto: UpdateBoardDto, userId: string): Promise<Board> {
    const board = await this.findBoard(boardId, userId);
    Object.assign(board, dto);
    return this.boardsRepository.save(board);
  }

  async remove(boardId: string, userId: string): Promise<Board> {
    const board = await this.findBoard(boardId, userId);
    return this.boardsRepository.remove(board);
  }

  // Finds a specific board by the boardId assigned to a specific user
  private async findBoard(boardId: string, userId: string) {
    const board = await this.boardsRepository.findOneBy({ id: boardId, user: { id: userId } });
    if (!board) {
      throw new BadRequestException('Board does not exist or user does not have access');
    }
    return board;
  }
}
