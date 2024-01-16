import { Board } from '../../boards/entities/board.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Entity('board_columns')
@Unique('UN_NAME_PER_BOARD', ['board', 'name'])
@Unique('UN_ORDER_PER_BOARD', ['board', 'order'])
export class BoardColumn extends BaseEntity {
  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns)
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
