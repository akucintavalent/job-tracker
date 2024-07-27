import { BadRequestException, Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from 'src/modules/boards/entities/board.entity';
import { CreateContactDto } from './dtos/create-contact.dto';
import { ContactMapper } from './contacts.mapper';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { FindContactDto } from './dtos/find-contact.dto';
import { ContactDto } from './dtos/contact.dto';
import { UpdateContact } from './dtos/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
    @InjectRepository(Board) private readonly boardsRepository: Repository<Board>,
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
    private readonly mapper: ContactMapper,
  ) {}

  async find(userId: string, params: FindContactDto): Promise<ContactDto[]> {
    if (!userId) throw new BadRequestException('UserId is required');
    const entities = await this.contactsRepository.find({
      where: { id: params.contactId, board: { id: params.boardId, user: { id: userId } } },
      relations: { board: true, jobApplications: true },
    });
    return entities.map(this.mapper.toDto);
  }

  async create(userId: string, body: CreateContactDto) {
    await this.validateBoadrExists(userId, body.boardId);
    const entity = this.mapper.toEntity(body);
    return this.contactsRepository.save(entity);
  }

  async update(userId: string, body: UpdateContact) {
    await this.validateContactExists(body.id, userId);
    const entity = this.mapper.toEntity(body);
    return this.contactsRepository.update({ id: body.id }, entity);
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
      throw new BadRequestException('Contact is alredy assigned to this JobApplication');
    }

    data.contactEntity.jobApplications.push(data.jobApplicationEntity);
    await this.contactsRepository.save(data.contactEntity);
  }

  async unassigContactFromJobApplication(
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
      throw new BadRequestException('Contact is not assigned to this JobApplication');
    }

    data.contactEntity.jobApplications = data.contactEntity.jobApplications.filter(
      (x) => x.id !== jobApplicationId,
    );
    await this.contactsRepository.save(data.contactEntity);
  }

  private async validateBoadrExists(userId: string, boardId: string) {
    if (!userId || !boardId) {
      throw new BadRequestException('UserId or BoardId is invalid');
    }
    if (!(await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } }))) {
      throw new BadRequestException('Board or user is not found');
    }
  }

  private async validateContactExists(contactId: string, userId: string) {
    if (!contactId || !userId) throw new BadRequestException('UserId or BoardId is invalid');
    if (
      !(await this.contactsRepository.existsBy({
        id: contactId,
        board: { user: { id: userId } },
      }))
    ) {
      throw new BadRequestException('Contact is not found');
    }
  }

  // Gets the Entity of a Contact and checks whether this Contact can be associated with a particular JobApplication.
  // Precondions: Contact and JobApplication are assigned to the same Board.
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
      throw new BadRequestException('Contact is not found');
    }

    const jobApplicationEntity = await this.jobApplicationRepository.findOne({
      where: { id: jobApplicationId, column: { board: { user: { id: userId } } } },
      select: { id: true, column: { id: true, board: { id: true } } },
      relations: { column: { board: true } },
    });

    if (!jobApplicationEntity) {
      throw new BadRequestException('JobApplication is not found');
    }

    if (jobApplicationEntity.column.board.id !== contactEntity.board.id) {
      throw new BadRequestException(
        'Contact cannot be assigned to this JobApplication, since this Contact is assigned to the different Board',
      );
    }

    return { contactEntity, jobApplicationEntity };
  }
}
