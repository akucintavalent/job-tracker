import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { ContactMethodType } from '../enums/contact-type.enum';
import { Contact } from './contact.entity';
import { BaseEntity } from '../../../entities/base.entity';

export class ContactMethod extends BaseEntity {
  @ManyToOne(() => Contact, (contact) => contact.contactEmails, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  // ENUM cannot be used here since migration creates a separate ENUM in DB per table
  // https://github.com/typeorm/typeorm/issues/5648
  @Column({
    name: 'type',
    nullable: false,
  })
  type: ContactMethodType;
}
