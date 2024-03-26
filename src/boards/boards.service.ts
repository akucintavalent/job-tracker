import { BadRequestException, Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from '../users/user.entity';
import { FindBoardDto } from './dtos/find-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateBoardDto, userId: string): Promise<Board> {
    if (!(await this.userRepository.existsBy({ id: userId }))) {
      throw new BadRequestException("User doesn't exists");
    }

    const entity = this.boardRepository.create({
      name: dto.name,
      user: { id: userId },
    });

    return await this.boardRepository.save(entity);
  }

  findBy(query: FindBoardDto): Promise<Board[]> {
    return this.boardRepository.findBy({
      id: query.id,
      name: query.name,
      user: { id: query.userId },
    });
  }

  findOne(id: string): Promise<Board> {
    return this.boardRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateBoardDto): Promise<Board> {
    const entity = await this.findById(id);
    Object.assign(entity, dto);
    return await this.boardRepository.save(entity);
  }

  async remove(id: string): Promise<Board> {
    const entity = await this.findById(id);
    return this.boardRepository.remove(entity);
  }

  private async findById(id: string) {
    const entity = await this.boardRepository.findOneBy({ id });
    if (!entity) {
      throw new BadRequestException("Board doesn't exists");
    }
    return entity;
  }
}
