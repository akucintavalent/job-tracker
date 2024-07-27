import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { BoardColumn } from './entities/board-column.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { UpdateBoardColumnDto } from './dtos/update-board-column.dto';
import { CreateBoardColumnDto } from './dtos/create-board-column.dto';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async create(dto: CreateBoardColumnDto, userId: string): Promise<BoardColumn> {
    if (!(await this.boardsRepository.existsBy({ id: dto.boardId, user: { id: userId } }))) {
      throw new BadRequestException("Board doesn't exists");
    }

    // take:1 operator throws an eror "column distinctAlias.BoardColumn_id does not exist"
    const dbColumns = await this.boardColumnsRepository.find({
      select: { order: true, name: true },
      where: { board: { id: dto.boardId } },
      order: { order: 'DESC' },
    });
    const order = dbColumns.length > 0 ? dbColumns[0].order + 1 : 0;

    if (dbColumns !== null && dbColumns.find((x) => x.name === dto.name)) {
      throw new ConflictException(`Column with '${dto.name}' name is alredy exists`);
    }

    const entity = this.boardColumnsRepository.create({
      name: dto.name,
      board: { id: dto.boardId },
      order: order,
    });

    return this.boardColumnsRepository.save(entity);
  }

  async createDefaultBoardColumns(boardId: string, userId: string) {
    if (!(await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } }))) {
      throw new BadRequestException("Board doesn't exists");
    }

    const defaultColumns = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'].map((v, i) =>
      this.boardColumnsRepository.create({ name: v, board: { id: boardId }, order: i }),
    );

    await this.boardColumnsRepository.save(defaultColumns);
  }

  findColumns(boardId: string, userId: string): Promise<BoardColumn[]> {
    return this.boardColumnsRepository.find({
      where: { board: { id: boardId, user: { id: userId } } },
      relations: { jobApplications: true },
    });
  }

  async rearrangeColumns(boardId: string, columnsIds: string[], userId: string) {
    if (!(await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } }))) {
      throw new BadRequestException("Board doesn't exists");
    }

    const dbColumns = await this.boardColumnsRepository.findBy({
      board: { id: boardId },
    });

    const dbColumnsIds = dbColumns.map((x) => x.id);
    this.validateRearrange(columnsIds, dbColumnsIds);

    for (let i = 0; i < dbColumns.length; i++) {
      dbColumns.find((x) => x.id === columnsIds[i]).order = i;
    }

    await this.boardColumnsRepository.upsert(dbColumns, ['id']);
  }

  async update(columnId: string, dto: UpdateBoardColumnDto, userId: string): Promise<BoardColumn> {
    const entity = await this.findById(columnId, userId);
    Object.assign(entity, dto);
    return this.boardColumnsRepository.save(entity);
  }

  async remove(columnId: string, userId: string): Promise<BoardColumn> {
    const entity = await this.findById(columnId, userId);
    return this.boardColumnsRepository.remove(entity);
  }

  private async findById(id: string, userId: string) {
    const entity = await this.boardColumnsRepository.findOneBy({
      id: id,
      board: { user: { id: userId } },
    });
    if (!entity) {
      throw new BadRequestException("Columns doesn't exists");
    }
    return entity;
  }

  private validateRearrange(columnsIds: string[], dbColumnsIds: string[]) {
    if (!columnsIds.length) {
      throw new BadRequestException('List of Column Ids is empty');
    }
    if (this.hasDuplicates(columnsIds)) {
      throw new BadRequestException('List has duplicated Id.');
    }
    if (!this.areEquals(columnsIds, dbColumnsIds)) {
      throw new BadRequestException('List must contains all Columns from this board.');
    }
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
