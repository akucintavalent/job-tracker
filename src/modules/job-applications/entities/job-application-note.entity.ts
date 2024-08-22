import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { BaseEntity } from '../../../entities/base.entity';

@Entity('job_application_notes')
export class JobApplicationNote extends BaseEntity {
  @ManyToOne(() => JobApplication, (jobApplication) => jobApplication.notes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_application_id' })
  jobApplication: JobApplication;

  @Column({ nullable: true })
  content: string;

  @Column()
  order: number;
}
