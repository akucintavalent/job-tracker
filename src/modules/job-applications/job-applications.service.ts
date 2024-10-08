import { BadRequestException, Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { BoardColumn } from '../board-columns/entities/board-column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';
import { Board } from '../boards/entities/board.entity';
import { ExceptionMessages } from '../../exceptions/exception-messages';
import { ArgumentInvalidException } from '../../exceptions/argument-invalid.exceptions';
import { Contact } from '../contacts/entities/contact.entity';
import { Company } from '../companies/entities/company.entity';
import { JobApplicationNote } from '../job-application-notes/entities/job-application-note.entity';
import { ContactsService } from '../contacts/contacts.service';
import * as _ from 'lodash';
import { JobApplicationNotesService } from '../job-application-notes/job-application-notes.service';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationsRepository: Repository<JobApplication>,
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
    private readonly contactsService: ContactsService,
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    @InjectRepository(JobApplicationNote)
    private readonly jobApplicationNotesRepository: Repository<JobApplicationNote>,
    private readonly jobApplicationNotesService: JobApplicationNotesService,
  ) {}

  async findBy(columnId: string, userId: string): Promise<JobApplication[]> {
    const boardColumnExist = await this.boardColumnsRepository.existsBy({
      id: columnId,
      board: { user: { id: userId } },
    });

    if (!boardColumnExist) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(BoardColumn.name));
    }

    const jobApplicationEntities = await this.jobApplicationsRepository.find({
      where: { column: { id: columnId } },
      relations: { notes: true, contacts: true, company: true },
      order: { notes: { order: 'ASC' } },
    });

    return jobApplicationEntities;
  }

  async create(dto: CreateJobApplicationDto, userId: string): Promise<JobApplication> {
    await this.validateBoardColumn(dto.columnId, userId);

    const jobApplication = this.jobApplicationsRepository.create({
      ..._.omit(dto, ['contacts', 'notes', 'company']),
      column: { id: dto.columnId },
    });

    const jobApplicationEntity = await this.jobApplicationsRepository.save(jobApplication);

    if (dto.contacts) {
      jobApplicationEntity.contacts = await Promise.all(
        dto.contacts.map((contactDto) => this.contactsService.create(userId, contactDto)),
      );
    }

    if (dto.notes) {
      console.log('NOTES');
      jobApplicationEntity.notes = await Promise.all(
        dto.notes.map(async (noteDto) => {
          noteDto.jobApplicationId = jobApplication.id;
          const noteMapped = await this.jobApplicationNotesService.create(noteDto, userId);
          return this.jobApplicationNotesRepository.findOneBy({ id: noteMapped.id });
        }),
      );
    }

    if (dto.company) {
      console.log('COMPANY');
      jobApplicationEntity.company = await this.companiesRepository.save(dto.company);
    }

    return this.jobApplicationsRepository.save(jobApplicationEntity);
  }

  async update(id: string, dto: UpdateJobApplicationDto, userId: string): Promise<JobApplication> {
    // Checks whether jobApplication exists for the current user
    await this.findOne(id, userId);

    const jobApplication = await this.jobApplicationsRepository.findOne({
      where: { id },
      relations: { column: true },
    });

    // Updates the column_id field
    if (dto.columnId && jobApplication.column.id !== dto.columnId) {
      const boardColumnExists = await this.boardColumnsRepository.existsBy({ id: dto.columnId });
      if (!boardColumnExists) {
        throw new BadRequestException(`Board column with '${dto.columnId}' id doesn't exists`);
      }
      jobApplication.column.id = dto.columnId;
    }
    // Updates the rest fields
    Object.assign(jobApplication, dto);

    return this.jobApplicationsRepository.save(jobApplication);
  }

  async delete(id: string, userId: string) {
    const jobApplication = await this.findOne(id, userId);
    return this.jobApplicationsRepository.delete(jobApplication);
  }

  async attachContact(id: string, contactId: string, userId: string) {
    const jobApplication = await this.jobApplicationsRepository.findOneByOrFail({
      id,
      column: { board: { user: { id: userId } } },
    });
    const contact = await this.contactsRepository.findOneByOrFail({
      id: contactId,
      board: { user: { id: userId } },
    });

    const containsContact = jobApplication.contacts.filter(({ id }) => id === contactId).length > 0;

    if (!containsContact) {
      jobApplication.contacts.push(contact);

      await this.jobApplicationsRepository.save(jobApplication);
    }
  }

  async attachCompany(id: string, companyId: string, userId: string) {
    const jobApplication = await this.jobApplicationsRepository.findOneByOrFail({
      id,
      column: { board: { user: { id: userId } } },
    });
    const company = await this.companiesRepository.findOneByOrFail({
      id: companyId,
    });

    if (jobApplication.company) {
      await this.companiesRepository.delete(jobApplication.company);
    }

    jobApplication.company = company;

    await this.jobApplicationsRepository.save(jobApplication);
  }

  private async findOne(jobId: string, userId: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationsRepository
      .createQueryBuilder('job')
      .innerJoin(BoardColumn, 'column', 'column.id = job.column_id')
      .innerJoin(Board, 'board', 'board.id = column.board_id')
      .where('board.user_id = :userId', { userId })
      .getOne();

    if (jobApplication == null) {
      throw new BadRequestException(`Job application with '${jobId}' id doesn't exists`);
    }

    return jobApplication;
  }

  private async validateBoardColumn(boardColumnId: string | null, userId: string) {
    if (!boardColumnId) {
      throw new ArgumentInvalidException(ExceptionMessages.fieldIsRequired('boardColumnId'));
    }

    const boardColumnExists = await this.boardColumnsRepository.existsBy({
      id: boardColumnId,
      board: { user: { id: userId } },
    });

    if (!boardColumnExists) {
      throw new BadRequestException(ExceptionMessages.doesNotExist(BoardColumn.name));
    }
  }
}
