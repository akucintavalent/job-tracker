import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Contact } from './contact.entity';
import { ContactCategory, ContactCategoryType } from '../enums/contact-type.enum';

@Entity('contact-phones')
export class ContactPhones extends BaseEntity {
  @ManyToOne(() => Contact, (contact) => contact.contactPhones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ length: 16 })
  phone: string;

  @Column({
    type: 'enum',
    enum: ContactCategory,
  })
  type: ContactCategoryType;
}
