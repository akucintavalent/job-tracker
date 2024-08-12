import { Repository } from 'typeorm';
import { ContactEmail } from './entities/contact-emails.entity';
import { ContactPhone } from './entities/contact-phones.entity';
import { ContactEmailMapper } from './mappers/contact-email.mapper';
import { ContactPhoneMapper } from './mappers/contact-phone.mapper';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEmailDto } from './dtos/contact-method-email.dto';
import { ArgumentInvalidException } from 'src/exceptions/argument-invalid.exceptions';
import { ContactPhoneDto } from './dtos/contact-method-phone.dto';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { CreateContactEmailDto } from './dtos/create-contact-method-email.dto';
import { CreateContactPhoneDto } from './dtos/create-contact-method-phone.dto';

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
  async createEmailsBulk(emails: ContactEmailDto[], contact: Contact) {
    if (!contact) throw new ArgumentInvalidException('Contact entity is required');

    const contactMethods = emails.map((e) => {
      const contactMethod = this.contactEmailMapper.toEntity(e);
      contactMethod.contact = contact;
      return contactMethod;
    });

    await this.contactEmailsRepository.insert(contactMethods);
  }

  // Adds an array of contact's phones
  // Doesn't checks if contact entity exists or not
  async createPhonesBulk(phones: ContactPhoneDto[], contact: Contact) {
    if (!contact) throw new ArgumentInvalidException('Contact entity is required');

    const contactMethods = phones.map((p) => {
      const contactMethod = this.contactPhoneMapper.toEntity(p);
      contactMethod.contact = contact;
      return contactMethod;
    });

    await this.contactPhonesRepository.insert(contactMethods);
  }

  async createContactMethodEmail(
    dto: CreateContactEmailDto,
    userId: string,
  ): Promise<ContactEmail> {
    if (
      !(await this.contactsRepository.existsBy({
        id: dto.contactId,
        board: { user: { id: userId } },
      }))
    ) {
      throw new BadRequestException("Contact doesn't exists");
    }

    const entity = this.contactEmailsRepository.create(dto);
    entity.contact = new Contact();
    entity.contact.id = dto.contactId;
    return this.contactEmailsRepository.save(entity);
  }

  async createContactMethodPhone(
    dto: CreateContactPhoneDto,
    userId: string,
  ): Promise<ContactPhone> {
    if (
      !(await this.contactsRepository.existsBy({
        id: dto.contactId,
        board: { user: { id: userId } },
      }))
    ) {
      throw new BadRequestException("Contact doesn't exists");
    }

    const entity = this.contactPhonesRepository.create(dto);
    entity.contact = new Contact();
    entity.contact.id = dto.contactId;
    return this.contactPhonesRepository.save(entity);
  }
}
