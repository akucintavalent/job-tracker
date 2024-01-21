import { BaseEntity } from '../../entities/base.entity';
import { BoardColumn } from '../../board-columns/entities/board-column.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('job-applications')
export class JobApplication extends BaseEntity {
  @Column()
  title: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.jobApplications)
  @JoinColumn({ name: 'column_id' })
  column: BoardColumn;
}
