import { BaseEntity } from '../../../entities/base.entity';
import { BoardColumn } from '../../board-columns/entities/board-column.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';
import { JobApplicationNote } from '../../job-application-notes/entities/job-application-note.entity';
import { Company } from '../../companies/entities/company.entity';

@Entity('job_applications')
export class JobApplication extends BaseEntity {
  @Column()
  title: string;

  @Column({ name: 'post_url', nullable: true })
  postUrl: string | null;

  @Column({ nullable: true })
  salary: string | null;

  @Column({ nullable: true })
  location: string | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  color: string | null;

  @Column({ type: 'date', nullable: true })
  deadline: string | null;

  @ManyToOne(() => BoardColumn, (column) => column.jobApplications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'column_id' })
  column: BoardColumn;

  @ManyToMany(() => Contact, (contact) => contact.jobApplications, { onDelete: 'CASCADE' })
  contacts: Contact[];

  @OneToMany(() => JobApplicationNote, (note) => note.jobApplication)
  notes: JobApplicationNote[];

  @OneToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
