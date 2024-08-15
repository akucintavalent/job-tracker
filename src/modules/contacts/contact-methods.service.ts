import { Repository } from 'typeorm';
import { ContactEmail } from './entities/contact-emails.entity';
import { ContactPhone } from './entities/contact-phones.entity';
import { ContactEmailMapper } from './mappers/contact-email.mapper';
import { ContactPhoneMapper } from './mappers/contact-phone.mapper';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEmailDto } from './dtos/contact-method/contact-email.dto';
import { ArgumentInvalidException } from 'src/exceptions/argument-invalid.exceptions';
import { ContactPhoneDto } from './dtos/contact-method/contact-phone.dto';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { CreateContactEmailDto } from './dtos/contact-method/create-contact-email.dto';
import { CreateContactPhoneDto } from './dtos/contact-method/create-contact-phone.dto';

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
  // Doesn't check if contact entity exists or not
  async createContactMethodEmailsBulk(emails: ContactEmailDto[], contact: Contact) {
    if (!contact) {
      throw new ArgumentInvalidException('Contact entity is required');
    }

    const contactMethods = emails.map((e) => {
      const contactMethod = this.contactEmailMapper.toEntity(e);
      contactMethod.contact = contact;
      return contactMethod;
    });

    await this.contactEmailsRepository.insert(contactMethods);
  }

  // Adds an array of contact's phones
  // Doesn't check if contact entity exists or not
  async createContactMethodPhonesBulk(phones: ContactPhoneDto[], contact: Contact) {
    if (!contact) {
      throw new ArgumentInvalidException('Contact entity is required');
    }

    const contactMethods = phones.map((p) => {
      const contactMethod = this.contactPhoneMapper.toEntity(p);
      contactMethod.contact = contact;
      return contactMethod;
    });

    await this.contactPhonesRepository.insert(contactMethods);
  }

  async getContactMethodEmails(contactId: string, userId: string): Promise<ContactEmail[]> {
    await this.validateContactExists(contactId, userId);

    return this.contactEmailsRepository.find({
      where: { contact: { id: contactId } },
      order: { createdAt: 'ASC' },
    });
  }

  async getContactMethodPhones(contactId: string, userId: string): Promise<ContactPhone[]> {
    await this.validateContactExists(contactId, userId);

    return this.contactPhonesRepository.find({
      where: { contact: { id: contactId } },
      order: { createdAt: 'ASC' },
    });
  }

  async createContactMethodEmail(
    contactEmailDto: CreateContactEmailDto,
    userId: string,
  ): Promise<ContactEmail> {
    await this.validateContactExists(contactEmailDto.contactId, userId);

    const entity = this.contactEmailsRepository.create(contactEmailDto);
    entity.contact = new Contact();
    entity.contact.id = contactEmailDto.contactId;
    return this.contactEmailsRepository.save(entity);
  }

  async createContactMethodPhone(
    contactPhoneDto: CreateContactPhoneDto,
    userId: string,
  ): Promise<ContactPhone> {
    await this.validateContactExists(contactPhoneDto.contactId, userId);

    const entity = this.contactPhonesRepository.create(contactPhoneDto);
    entity.contact = new Contact();
    entity.contact.id = contactPhoneDto.contactId;
    return this.contactPhonesRepository.save(entity);
  }

  async updateContactMethodEmail(
    contactEmailDto: ContactEmailDto,
    userId: string,
  ): Promise<ContactEmail> {
    if (!contactEmailDto.id) {
      throw new BadRequestException('ContactMethod Id field is required');
    }

    const entity = await this.contactEmailsRepository.findOneBy({
      id: contactEmailDto.id,
      contact: { board: { user: { id: userId } } },
    });

    if (!entity) {
      throw new BadRequestException('ContactMethod is not found');
    }

    Object.assign(entity, contactEmailDto);
    return this.contactEmailsRepository.save(entity);
  }

  async updateContactMethodPhone(
    contactPhoneDto: ContactPhoneDto,
    userId: string,
  ): Promise<ContactPhone> {
    if (!contactPhoneDto.id) {
      throw new BadRequestException('ContactMethod Id field is required');
    }

    const entity = await this.contactPhonesRepository.findOneBy({
      id: contactPhoneDto.id,
      contact: { board: { user: { id: userId } } },
    });

    if (!entity) {
      throw new BadRequestException('ContactMethod is not found');
    }

    Object.assign(entity, contactPhoneDto);
    return this.contactPhonesRepository.save(entity);
  }

  async deleteContactMethodEmail(id: string, userId: string) {
    const contactMethodExists = await this.contactEmailsRepository.existsBy({
      id,
      contact: { board: { user: { id: userId } } },
    });

    if (!contactMethodExists) {
      throw new BadRequestException('ContactMethod is not found');
    }

    return this.contactEmailsRepository.softDelete({ id });
  }

  async deleteContactMethodPhone(id: string, userId: string) {
    const contactMethodExists = await this.contactPhonesRepository.existsBy({
      id,
      contact: { board: { user: { id: userId } } },
    });

    if (!contactMethodExists) {
      throw new BadRequestException('ContactMethod is not found');
    }

    return this.contactPhonesRepository.softDelete({ id });
  }

  private async validateContactExists(contactId: string, userId: string) {
    const isContactExists = !(await this.contactsRepository.existsBy({
      id: contactId,
      board: { user: { id: userId } },
    }));
    if (isContactExists) {
      throw new BadRequestException("Contact doesn't exists");
    }
  }
}
