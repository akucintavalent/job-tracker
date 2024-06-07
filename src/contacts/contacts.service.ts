import { BadRequestException, Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { CreateContactDto } from './dtos/create-contact.dto';
import { ContactMapper } from './contacts.mapper';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
    @InjectRepository(Board) private readonly boardsRepository: Repository<Board>,
    private readonly mapper: ContactMapper,
  ) {}

  async getAllContactsForBoard(userId: string, boardId: string): Promise<Contact[]> {
    await this.validateBoadrExists(userId, boardId);
    return await this.contactsRepository.findBy({ board: { id: boardId } });
  }

  async create(userId: string, body: CreateContactDto) {
    await this.validateBoadrExists(userId, body.boardId);
    const entity = this.mapper.toEntity(body);
    return this.contactsRepository.save(entity);
  }

  async update(contactId: string, userId: string, body: CreateContactDto) {
    await this.validateContactExists(contactId, userId);
    const entity = this.mapper.toEntity(body);
    return this.contactsRepository.update({ id: contactId }, entity);
  }

  async delete(contactId: string, userId: string) {
    await this.validateContactExists(contactId, userId);
    await this.contactsRepository.softDelete({ id: contactId });
  }

  private async validateBoadrExists(userId: string, boardId: string) {
    if (!userId || !boardId) throw new BadRequestException('UserId or BoardId is invalid');
    if (!(await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } })))
      throw new BadRequestException('Board or user is not found');
  }

  private async validateContactExists(contactId: string, userId: string) {
    if (!contactId || !userId) throw new BadRequestException('UserId or BoardId is invalid');
    if (
      !(await this.contactsRepository.existsBy({
        id: contactId,
        board: { user: { id: userId } },
      }))
    )
      throw new BadRequestException('Contact is not found');
  }
}
