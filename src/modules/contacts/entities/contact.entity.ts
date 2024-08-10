import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Board } from '../../boards/entities/board.entity';
import { JobApplication } from '../../job-applications/entities/job-application.entity';
import { ContactEmails } from './contact-emails.entity';
import { ContactPhones } from './contact-phones.entity';

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'job_title' })
  jobTitle: string;

  @ManyToOne(() => Board, (board) => board.contacts, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToMany(() => JobApplication, (job) => job.contacts, { onDelete: 'CASCADE' })
  @JoinTable()
  jobApplications: JobApplication[];

  @OneToMany(() => ContactEmails, (contactEmails) => contactEmails.contact)
  contactEmails: ContactEmails[];

  @OneToMany(() => ContactPhones, (contactPhones) => contactPhones.contact)
  contactPhones: ContactPhones[];

  @Column({ name: 'company_name', nullable: true })
  companyName: string;

  @Column({ name: 'company_location', nullable: true })
  companyLocation: string;

  @Column({ name: 'twitter_url', nullable: true })
  twitterUrl: string;

  @Column({ name: 'facebook_url', nullable: true })
  facebookUrl: string;

  @Column({ name: 'linkedin_url', nullable: true })
  linkedinUrl: string;

  @Column({ name: 'github_url', nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  comment: string;
}
