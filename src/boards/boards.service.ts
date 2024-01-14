import { BadRequestException, Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateBoardDto){
    if (!(await this.userRepository.existsBy({ id: dto.userId }))) {
      throw new BadRequestException("User doesn't exists");
    }

    const entity = this.boardRepository.create({
      name: dto.name,
      user: { id: dto.userId },
    });

    await this.boardRepository.save(entity);
  }
}
