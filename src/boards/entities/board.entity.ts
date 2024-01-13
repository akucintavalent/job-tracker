import { User } from '../../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';

@Entity('boards')
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.board)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;
}
