import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { User } from '../users/user.entity';

@Entity('user-code-verifications')
export class UserCodeVerification extends BaseEntity {
  @Column({ length: 6 })
  code: string;

  @ManyToOne(() => User, (user) => user.userCodeVerifications)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
