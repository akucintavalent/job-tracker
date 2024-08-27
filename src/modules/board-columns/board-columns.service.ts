import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { BoardColumn } from './entities/board-column.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { UpdateBoardColumnDto } from './dtos/update-board-column.dto';
import { CreateBoardColumnDto } from './dtos/create-board-column.dto';
import { ExceptionMessages } from 'src/exceptions/exception-messages';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async create(dto: CreateBoardColumnDto, userId: string): Promise<BoardColumn> {
    const boardExists = await this.boardsRepository.existsBy({
      id: dto.boardId,
      user: { id: userId },
    });
    if (!boardExists) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(Board.name));
    }

    // take:1 operator throws an eror "column distinctAlias.BoardColumn_id does not exist"
    const dbColumns = await this.boardColumnsRepository.find({
      select: { order: true, name: true },
      where: { board: { id: dto.boardId } },
      order: { order: 'DESC' },
    });
    const order = dbColumns.length > 0 ? dbColumns[0].order + 1 : 0;

    if (dbColumns !== null && dbColumns.find((x) => x.name === dto.name)) {
      throw new ConflictException(`Column with '${dto.name}' name already exists`);
    }

    const entity = this.boardColumnsRepository.create({
      name: dto.name,
      board: { id: dto.boardId },
      order: order,
    });

    return this.boardColumnsRepository.save(entity);
  }

  async createDefaultBoardColumns(boardId: string, userId: string): Promise<BoardColumn[]> {
    if (!(await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } }))) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(Board.name));
    }

    const defaultColumns = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'].map((v, i) =>
      this.boardColumnsRepository.create({ name: v, board: { id: boardId }, order: i }),
    );

    return await this.boardColumnsRepository.save(defaultColumns);
  }

  findColumns(boardId: string, userId: string): Promise<BoardColumn[]> {
    return this.boardColumnsRepository.find({
      where: { board: { id: boardId, user: { id: userId } } },
      relations: { jobApplications: true },
      order: { order: 'ASC', jobApplications: { createdAt: 'ASC' } },
    });
  }

  async rearrangeColumns(boardId: string, columnsIds: string[], userId: string) {
    const boardExists = await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } });
    if (!boardExists) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(Board.name));
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
    const boardColumn = await this.findById(columnId, userId);
    Object.assign(boardColumn, dto);
    return this.boardColumnsRepository.save(boardColumn);
  }

  async remove(columnId: string, userId: string): Promise<BoardColumn> {
    const boardColumn = await this.findById(columnId, userId);
    return this.boardColumnsRepository.remove(boardColumn);
  }

  private async findById(id: string, userId: string) {
    const boardColumn = await this.boardColumnsRepository.findOneBy({
      id: id,
      board: { user: { id: userId } },
    });
    if (!boardColumn) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(BoardColumn.name));
    }
    return boardColumn;
  }

  private validateRearrange(columnsIds: string[], dbColumnsIds: string[]) {
    if (!columnsIds.length) {
      throw new BadRequestException('List of column ids is empty');
    }
    if (columnsIds.containsDuplicates()) {
      throw new BadRequestException('List has duplicated Id.');
    }
    if (!columnsIds.equals(dbColumnsIds)) {
      throw new BadRequestException('List must contains all columns from this board.');
    }
  }
}
