import { BaseEntity } from '../../../entities/base.entity';
import { BoardColumn } from '../../board-columns/entities/board-column.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';

@Entity('job_applications')
export class JobApplication extends BaseEntity {
  @Column()
  title: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.jobApplications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'column_id' })
  column: BoardColumn;

  @ManyToMany(() => Contact, (contact) => contact.jobApplications, { onDelete: 'CASCADE' })
  contacts: Contact[];
}
