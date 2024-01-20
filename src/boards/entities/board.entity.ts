import { User } from '../../users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { BoardColumn } from '../../board-columns/entities/board-column.entity';

@Entity('boards')
export class Board extends BaseEntity {
  @ManyToOne(() => User, (user) => user.board)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @OneToMany(() => BoardColumn, (column) => column.board)
  columns: BoardColumn[];
}
