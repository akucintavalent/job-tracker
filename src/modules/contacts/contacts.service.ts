import { BadRequestException, Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards/entities/board.entity';
import { CreateContactDto } from './dtos/create-contact.dto';
import { ContactMapper } from './mappers/contacts.mapper';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { FindContactDto } from './dtos/find-contact.dto';
import { ContactDto } from './dtos/contact.dto';
import { UpdateContact } from './dtos/update-contact.dto';
import { ContactMethodsService } from './contact-methods.service';
import { ExceptionMessages } from '../../exceptions/exception-messages';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
    @InjectRepository(Board) private readonly boardsRepository: Repository<Board>,
    @InjectRepository(JobApplication)
    private readonly jobApplicationsRepository: Repository<JobApplication>,
    private readonly mapper: ContactMapper,
    private readonly contactMethodService: ContactMethodsService,
  ) {}

  async find(userId: string, params: FindContactDto): Promise<ContactDto[]> {
    if (!userId) {
      throw new BadRequestException(ExceptionMessages.fieldIsRequired('userId'));
    }
    const contacts = await this.contactsRepository.find({
      where: { id: params.contactId, board: { id: params.boardId, user: { id: userId } } },
      relations: { board: true, jobApplications: true, contactEmails: true, contactPhones: true },
      order: { createdAt: 'ASC' },
    });
    return contacts.map(this.mapper.toDto);
  }

  async create(userId: string, body: CreateContactDto) {
    await this.validateBoardExists(userId, body.boardId);
    let contactEntity = this.mapper.toEntity(body);
    contactEntity = await this.contactsRepository.save(contactEntity);

    if (body.emails) {
      await this.contactMethodService.createContactMethodEmailsBulk(body.emails, contactEntity);
    }

    if (body.phones) {
      await this.contactMethodService.createContactMethodPhonesBulk(body.phones, contactEntity);
    }
  }

  async update(userId: string, body: UpdateContact) {
    await this.validateContactExists(body.id, userId);
    const contactEntity = this.mapper.toEntity(body);
    return this.contactsRepository.update({ id: body.id }, contactEntity);
  }

  async delete(contactId: string, userId: string) {
    await this.validateContactExists(contactId, userId);
    await this.contactsRepository.softDelete({ id: contactId });
  }

  async assignContactToJobApplication(contactId: string, jobApplicationId: string, userId: string) {
    const data = await this.validateIsJobApplicationAlignToContact(
      contactId,
      jobApplicationId,
      userId,
    );

    if (data.contactEntity.jobApplications.filter((x) => x.id === jobApplicationId).length > 0) {
      throw new BadRequestException('Contact is already assigned to this job application');
    }

    data.contactEntity.jobApplications.push(data.jobApplicationEntity);
    await this.contactsRepository.save(data.contactEntity);
  }

  async unassignContactFromJobApplication(
    contactId: string,
    jobApplicationId: string,
    userId: string,
  ) {
    const data = await this.validateIsJobApplicationAlignToContact(
      contactId,
      jobApplicationId,
      userId,
    );

    if (data.contactEntity.jobApplications.filter((x) => x.id === jobApplicationId).length === 0) {
      throw new BadRequestException('Contact is not assigned to this job application');
    }

    data.contactEntity.jobApplications = data.contactEntity.jobApplications.filter(
      (x) => x.id !== jobApplicationId,
    );
    await this.contactsRepository.save(data.contactEntity);
  }

  private async validateBoardExists(userId: string, boardId: string) {
    if (!userId || !boardId) {
      throw new BadRequestException('userId or boardId is invalid');
    }
    const boardExists = await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } });
    if (!boardExists) {
      throw new BadRequestException('Board or user is not found');
    }
  }

  private async validateContactExists(contactId: string, userId: string) {
    if (!contactId || !userId) {
      throw new BadRequestException('userId or boardId is invalid');
    }
    const contactExists = await this.contactsRepository.existsBy({
      id: contactId,
      board: { user: { id: userId } },
    });
    if (!contactExists) {
      throw new BadRequestException('Contact is not found');
    }
  }

  // Gets the Entity of a Contact and checks whether this Contact can be associated with a particular JobApplication.
  // Preconditions: Contact and JobApplication are assigned to the same Board.
  private async validateIsJobApplicationAlignToContact(
    contactId: string,
    jobApplicationId: string,
    userId: string,
  ): Promise<{ contactEntity: Contact; jobApplicationEntity: JobApplication }> {
    if (!contactId || !jobApplicationId || !userId) {
      throw new BadRequestException('Data is invalid');
    }

    const contactEntity = await this.contactsRepository.findOne({
      where: { id: contactId },
      select: { id: true, board: { id: true }, jobApplications: true },
      relations: { board: true, jobApplications: true },
    });

    if (!contactEntity) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(Contact.name));
    }

    const jobApplicationEntity = await this.jobApplicationsRepository.findOne({
      where: { id: jobApplicationId, column: { board: { user: { id: userId } } } },
      select: { id: true, column: { id: true, board: { id: true } } },
      relations: { column: { board: true } },
    });

    if (!jobApplicationEntity) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(JobApplication.name));
    }

    if (jobApplicationEntity.column.board.id !== contactEntity.board.id) {
      throw new BadRequestException(
        'Contact cannot be assigned to this job application, since this contact is assigned to the different board',
      );
    }

    return { contactEntity, jobApplicationEntity };
  }
}
