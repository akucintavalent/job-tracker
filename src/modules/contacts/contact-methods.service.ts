import { Repository } from 'typeorm';
import { ContactEmail } from './entities/contact-emails.entity';
import { ContactPhone } from './entities/contact-phones.entity';
import { ContactEmailMapper } from './mappers/contact-email.mapper';
import { ContactPhoneMapper } from './mappers/contact-phone.mapper';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEmailDto } from './dtos/contact-email.dto';
import { ArgumentInvalidException } from 'src/exceptions/argument-invalid.exceptions';
import { ContactPhoneDto } from './dtos/contact-phone.dto';

export class ContactMethodsService {
  constructor(
    @InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
    @InjectRepository(ContactEmail)
    private readonly contactEmailsRepository: Repository<ContactEmail>,
    @InjectRepository(ContactPhone)
    private readonly contactPhonesRepository: Repository<ContactPhone>,
    private readonly contactEmailMapper: ContactEmailMapper,
    private readonly contactPhoneMapper: ContactPhoneMapper,
  ) {}

  // Adds an array of contact's emails
  // Doesn't checks if contact entity exists or not
  async addEmailsBulk(emails: ContactEmailDto[], contact: Contact) {
    if (!contact) throw new ArgumentInvalidException('Contact entity is required');

    const contactMethods = emails.map((e) => {
      const contactMethod = this.contactEmailMapper.toEntity(e);
      contactMethod.contact = contact;
      return contactMethod;
    });

    await this.contactEmailsRepository.insert(contactMethods);
  }

  // Adds an array of contact's emails
  // Doesn't checks if contact entity exists or not
  async addPhonesBulk(phones: ContactPhoneDto[], contact: Contact) {
    if (!contact) throw new ArgumentInvalidException('Contact entity is required');

    const contactMethods = phones.map((p) => {
      const contactMethod = this.contactPhoneMapper.toEntity(p);
      contactMethod.contact = contact;
      return contactMethod;
    });

    await this.contactPhonesRepository.insert(contactMethods);
  }
}
