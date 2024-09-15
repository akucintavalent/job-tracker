import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { JobApplication } from '../../job-applications/entities/job-application.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  url: string | null;

  @Column({ nullable: true })
  industry: string | null;

  @OneToOne(() => JobApplication)
  @JoinColumn({ name: 'job_application_id' })
  jobApplication: JobApplication;
}
