import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { UserRole, UserRoleType } from './enums/user-role.enum';
import { Board } from '../boards/entities/board.entity';
import { BaseEntity } from '../entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRoleType;

  @OneToMany(() => Board, (board) => board.user)
  board: Board[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    console.debug('hashing password...');
    this.password = await bcrypt.hash(this.password, 10);
  }
}
