import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { BoardColumn } from '../../../board-columns/entities/board-column.entity';
import { Contact } from '../../../contacts/entities/contact.entity';

@Entity('boards')
export class Board extends BaseEntity {
  @ManyToOne(() => User, (user) => user.board, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({ name: 'is_archived', default: false })
  isArchived: boolean;

  @OneToMany(() => BoardColumn, (column) => column.board)
  columns: BoardColumn[];

  @OneToMany(() => Contact, (contact) => contact.board)
  contacts: Contact[];
}
