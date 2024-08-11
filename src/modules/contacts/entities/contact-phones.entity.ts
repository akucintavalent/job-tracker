import { Column, Entity } from 'typeorm';
import { ContactMethod } from './contact-method.entity';

@Entity('contact-phones')
export class ContactPhones extends ContactMethod {
  @Column({ length: 16 })
  phone: string;
}
