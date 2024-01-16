import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardColumn } from './entities/board-column.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { UpdateBoardColumnDto } from './dtos/update-board-column.dto';
import { CreateBoardColumnDto } from './dtos/create-board-column.dto';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly boardColumnRepository: Repository<BoardColumn>,
    @InjectRepository(Board)
    private readonly boardRepository1: Repository<Board>,
  ) {}

  async create(dto: CreateBoardColumnDto): Promise<BoardColumn> {
    if (!(await this.boardRepository1.existsBy({ id: dto.boardId }))) {
      throw new BadRequestException("Board doesn't exists");
    }

    const entity = this.boardColumnRepository.create({
      name: dto.name,
      board: { id: dto.boardId },
      order: 1, // TODO: make logic to reorder columns
    });

    return await this.boardColumnRepository.save(entity);
  }

  findColumns(boardId: string): Promise<BoardColumn[]> {
    return this.boardColumnRepository.findBy({ board: { id: boardId } });
  }

  async update(id: string, dto: UpdateBoardColumnDto) {
    const entity = await this.findById(id);
    Object.assign(entity, dto);
    return await this.boardColumnRepository.save(entity);
  }

  async remove(id: string): Promise<BoardColumn> {
    const entity = await this.findById(id);
    return this.boardColumnRepository.remove(entity);
  }

  private async findById(id: string) {
    const entity = await this.boardColumnRepository.findOneBy({ id });
    if (!entity) {
      throw new BadRequestException("Columns doesn't exists");
    }
    return entity;
  }
}
