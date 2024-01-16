import { Board } from '../../boards/entities/board.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('board_columns')
export class BoardColumn extends BaseEntity {
  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns)
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
