import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Contact } from './contact.entity';

@Entity('contact-emails')
export class ContactEmails extends BaseEntity {
  @ManyToOne(() => Contact, (contact) => contact.contactEmails, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column()
  email: string;
}
