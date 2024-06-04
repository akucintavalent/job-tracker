import { BadRequestException, Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { CreateContactDto } from './dtos/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
    @InjectRepository(Board) private readonly boardsRepository: Repository<Board>,
  ) {}

  async getAllContactsForBoard(userId: string, boardId: string): Promise<Contact[]> {
    await this.validateBoadrExists(userId, boardId);
    return await this.contactsRepository.findBy({ board: { id: boardId } });
  }

  async create(userId: string, body: CreateContactDto) {
    await this.validateBoadrExists(userId, body.boardId);
    const entity = this.contactsRepository.create(body);
    await this.contactsRepository.save(entity);
    return entity;
  }

  private async validateBoadrExists(userId: string, boardId: string) {
    if (!userId || !boardId) throw new BadRequestException('UserId or BoardId is invalid');
    if (!(await this.boardsRepository.existsBy({ id: boardId, user: { id: userId } })))
      throw new BadRequestException('Board or user is not found');
  }
}
