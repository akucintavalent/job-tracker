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

  async rearangeColumns(boardId: string, columnsIds: string[]) {
    if (!(await this.boardRepository.existsBy({ id: boardId }))) {
      throw new BadRequestException("Board doesn't exists");
    }

    const dbColumns = await this.boardColumnRepository.findBy({
      board: { id: boardId },
    });

    const dbColumnsIds = dbColumns.map((x) => x.id);
    this.validateRearange(columnsIds, dbColumnsIds);

    for (let i = 0; i < dbColumns.length; i++) {
      dbColumns.find((x) => x.id === columnsIds[i]).order = i;
    }

    return await this.boardColumnRepository.upsert(dbColumns, ['id']);
  }

  async update(columnId: string, dto: UpdateBoardColumnDto) {
    const entity = await this.findById(columnId);
    Object.assign(entity, dto);
    return await this.boardColumnRepository.save(entity);
  }

  async remove(columnId: string): Promise<BoardColumn> {
    const entity = await this.findById(columnId);
    return this.boardColumnRepository.remove(entity);
  }

  private async findById(id: string) {
    const entity = await this.boardColumnRepository.findOneBy({ id });
    if (!entity) {
      throw new BadRequestException("Columns doesn't exists");
    }
    return entity;
  }

  private validateRearange(columnsIds: string[], dbColumnsIds: string[]) {
    if (!columnsIds)
      throw new BadRequestException('List of Column Ids is empty');
    if (this.hasDuplicates(columnsIds))
      throw new BadRequestException('List has duplicated Id.');
    if (!this.areEquals(columnsIds, dbColumnsIds))
      throw new BadRequestException(
        'List must contains all Columns from this board.',
      );
  }

  private hasDuplicates(array: any[]): boolean {
    const uniqueSet = new Set(array);
    return array.length !== uniqueSet.size;
  }

  private areEquals(array1: any[], array2: any[]): boolean {
    const set1 = new Set(array1);
    const set2 = new Set(array2);
    return set1.size === set2.size && [...set1].every((x) => set2.has(x));
  }
}
