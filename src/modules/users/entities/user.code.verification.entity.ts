import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { User } from './user.entity';
import { VerificationProcess, VerificationProcessType } from '../enums/verification-process.enum';

@Entity('user_code_verifications')
export class UserCodeVerification extends BaseEntity {
  @Column({ length: 6 })
  code: string;

  @ManyToOne(() => User, (user) => user.userCodeVerifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: VerificationProcess,
  })
  process: VerificationProcessType;
}
