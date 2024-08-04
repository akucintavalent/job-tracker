import { BadRequestException, Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from '../users/entities/user.entity';
import { FindBoardDto } from './dtos/find-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { BoardColumnsService } from '../board-columns/board-columns.service';

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
    if (!(await this.usersRepository.existsBy({ id: userId }))) {
      throw new BadRequestException("User doesn't exists");
    }

    const entity = this.boardsRepository.create({
      name: dto.name,
      user: { id: userId },
    });

    return this.boardsRepository.save(entity);
  }

  async createDefaultBoard(userId: string) {
    if (!(await this.usersRepository.existsBy({ id: userId }))) {
      throw new BadRequestException("User doesn't exists");
    }

    let board = this.boardsRepository.create({
      name: `Job Search ${new Date().getFullYear()}`,
      user: { id: userId },
    });

    board = await this.boardsRepository.save(board);

    await this.boardsColumnService.createDefaultBoardColumns(board.id, userId);
  }

  async findBy(query: FindBoardDto, userId: string): Promise<Board[]> {
    if (!(await this.usersRepository.existsBy({ id: userId }))) {
      throw new BadRequestException("User doesn't exists");
    }

    const boardName = query.name?.length > 0 ? Like(`%${query.name}%`) : null;

    return this.boardsRepository.findBy({
      name: boardName,
      user: { id: userId },
    });
  }

  async findOne(boardId: string, userId: string): Promise<Board> {
    const board = await this.findBoard(boardId, userId);
    board.columns = await this.boardsColumnService.findColumns(board.id, userId);
    return board;
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
