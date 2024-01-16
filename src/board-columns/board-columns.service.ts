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
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(dto: CreateBoardColumnDto): Promise<BoardColumn> {
    if (!(await this.boardRepository.existsBy({ id: dto.boardId }))) {
      throw new BadRequestException("Board doesn't exists");
    }

    // take:1 operator throws an eror "column distinctAlias.BoardColumn_id does not exist"
    const dbColumns = await this.boardColumnRepository.find({
      select: { order: true, name: true },
      where: { board: { id: dto.boardId } },
      order: { order: 'DESC' },
    });
    const order = dbColumns != null ? dbColumns[0].order + 1 : 0;

    if (dbColumns != null && dbColumns.find((x) => x.name === dto.name)) {
      throw new BadRequestException(
        `Column with '${dto.name}' name is alredy exists`,
      );
    }

    const entity = this.boardColumnRepository.create({
      name: dto.name,
      board: { id: dto.boardId },
      order: order,
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
