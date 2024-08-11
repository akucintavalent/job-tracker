import { Column, Entity } from 'typeorm';
import { ContactMethod } from './contact-method.entity';

@Entity('contact-emails')
export class ContactEmails extends ContactMethod {
  @Column()
  email: string;
}
