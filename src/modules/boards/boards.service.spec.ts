import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { User } from '../users/entities/user.entity';
import { BoardColumnsService } from '../board-columns/board-columns.service';
import { UserRole } from '../users/enums/user-role.enum';
import { Repository } from 'typeorm';
import { newGuid } from '../../utils/guid';

describe('BoardsService', () => {
  let service: BoardsService;
  let boardColumnsService: BoardColumnsService;
  let boardsRepository: Repository<Board>;
  let usersRepository: Repository<User>;

  const validUser = {
    id: newGuid(),
    email: 'user@email.com',
    role: UserRole.USER,
  } as User;

  const validBoard = {
    id: newGuid(),
    name: 'Job Search 2024',
    user: validUser,
  } as Board;

  beforeEach(async () => {
    const usersRepositoryMock = {
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      save: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      remove: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
    };

    const boardsRepositoryMock = {
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(validBoard)),
      save: jest.fn().mockImplementation(() => Promise.resolve(validBoard)),
      remove: jest.fn().mockImplementation(() => Promise.resolve(validBoard)),
    };

    const boardRepositoryToken = getRepositoryToken(Board);
    const userRepositoryToken = getRepositoryToken(User);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        { provide: boardRepositoryToken, useValue: boardsRepositoryMock },
        { provide: userRepositoryToken, useValue: usersRepositoryMock },
        { provide: BoardColumnsService, useValue: {} },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    boardColumnsService = module.get<BoardColumnsService>(BoardColumnsService);
    boardsRepository = module.get<Repository<Board>>(boardRepositoryToken);
    usersRepository = module.get<Repository<User>>(userRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(boardColumnsService).toBeDefined();
    expect(boardsRepository).toBeDefined();
    expect(usersRepository).toBeDefined();
  });
});
