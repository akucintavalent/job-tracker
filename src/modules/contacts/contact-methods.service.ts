import { Repository } from 'typeorm';
import { ContactEmail } from './entities/contact-emails.entity';
import { ContactPhone } from './entities/contact-phones.entity';
import { ContactEmailMapper } from './mappers/contact-email.mapper';
import { ContactPhoneMapper } from './mappers/contact-phone.mapper';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactMethodEmailDto } from './dtos/contact-method/contact-method-email.dto';
import { ArgumentInvalidException } from 'src/exceptions/argument-invalid.exceptions';
import { ContactMethodPhoneDto } from './dtos/contact-method/contact-method-phone.dto';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { CreateContactEmailDto } from './dtos/contact-method/create-contact-method-email.dto';
import { CreateContactPhoneDto } from './dtos/contact-method/create-contact-method-phone.dto';

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
  async createEmailsBulk(emails: ContactMethodEmailDto[], contact: Contact) {
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
  async createPhonesBulk(phones: ContactMethodPhoneDto[], contact: Contact) {
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

  async updateContactMethodEmail(
    dto: ContactMethodEmailDto,
    userId: string,
  ): Promise<ContactEmail> {
    if (!dto.id) throw new BadRequestException('ContactMethod Id field is required');

    const entity = await this.contactEmailsRepository.findOneBy({
      id: dto.id,
      contact: { board: { user: { id: userId } } },
    });

    if (!entity) throw new BadRequestException('ContactMethod is not found');

    Object.assign(entity, dto);
    return this.contactEmailsRepository.save(entity);
  }

  async updateContactMethodPhone(
    dto: ContactMethodPhoneDto,
    userId: string,
  ): Promise<ContactPhone> {
    if (!dto.id) throw new BadRequestException('ContactMethod Id field is required');

    const entity = await this.contactPhonesRepository.findOneBy({
      id: dto.id,
      contact: { board: { user: { id: userId } } },
    });

    if (!entity) throw new BadRequestException('ContactMethod is not found');

    Object.assign(entity, dto);
    return this.contactPhonesRepository.save(entity);
  }

  async deleteContactMethodEmail(id: string, userId: string) {
    const contactMethodExists = await this.contactEmailsRepository.existsBy({
      id,
      contact: { board: { user: { id: userId } } },
    });

    if (!contactMethodExists) throw new BadRequestException('ContactMethod is not found');

    return this.contactEmailsRepository.softDelete({ id });
  }

  async deleteContactMethodPhone(id: string, userId: string) {
    const contactMethodExists = await this.contactPhonesRepository.existsBy({
      id,
      contact: { board: { user: { id: userId } } },
    });

    if (!contactMethodExists) throw new BadRequestException('ContactMethod is not found');

    return this.contactPhonesRepository.softDelete({ id });
  }
}
