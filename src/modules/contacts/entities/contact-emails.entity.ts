import { Column, Entity } from 'typeorm';
import { ContactMethod } from './contact-method.entity';

@Entity('contact-emails')
export class ContactEmail extends ContactMethod {
  @Column()
  email: string;
}
