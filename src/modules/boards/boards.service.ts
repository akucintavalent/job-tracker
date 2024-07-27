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
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly boardColumnService: BoardColumnsService,
  ) {}

  async create(dto: CreateBoardDto, userId: string): Promise<Board> {
    if (!(await this.userRepository.existsBy({ id: userId }))) {
      throw new BadRequestException("User doesn't exists");
    }

    const entity = this.boardRepository.create({
      name: dto.name,
      user: { id: userId },
    });

    return this.boardRepository.save(entity);
  }

  async createDefaultBoard(userId: string) {
    if (!(await this.userRepository.existsBy({ id: userId }))) {
      throw new BadRequestException("User doesn't exists");
    }

    const entity = this.boardRepository.create({
      name: `Job Search ${new Date().getFullYear()}`,
      user: { id: userId },
    });

    const boardEntity = await this.boardRepository.save(entity);

    await this.boardColumnService.createDefaultBoardColumns(boardEntity.id, userId);
  }

  findBy(query: FindBoardDto, userId: string): Promise<Board[]> {
    const boardName = query.name?.length > 0 ? Like(`%${query.name}%`) : null;

    return this.boardRepository.findBy({
      name: boardName,
      user: { id: userId },
    });
  }

  async findOne(boardId: string, userId: string): Promise<Board> {
    const boardEntity = await this.findBoard(boardId, userId);
    boardEntity.columns = await this.boardColumnService.findColumns(boardEntity.id, userId);
    return boardEntity;
  }

  async update(boardId: string, dto: UpdateBoardDto, userId: string): Promise<Board> {
    const entity = await this.findBoard(boardId, userId);
    Object.assign(entity, dto);
    return this.boardRepository.save(entity);
  }

  async remove(boardId: string, userId: string): Promise<Board> {
    const entity = await this.findBoard(boardId, userId);
    return this.boardRepository.remove(entity);
  }

  // Finds a specific board by the boardId assigned to a specific user
  private async findBoard(boardId: string, userId: string) {
    const entity = await this.boardRepository.findOneBy({ id: boardId, user: { id: userId } });
    if (!entity) {
      throw new BadRequestException('The Board does not exist or the user does not have access');
    }
    return entity;
  }
}
