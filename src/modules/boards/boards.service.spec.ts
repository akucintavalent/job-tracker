import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { User } from '../users/entities/user.entity';
import { BoardColumnsService } from '../board-columns/board-columns.service';
import { UserRole } from '../users/enums/user-role.enum';
import { Repository } from 'typeorm';
import { newGuid } from '../../utils/guid';
import { CreateBoardDto } from './dtos/create-board.dto';
import { FindBoardDto } from './dtos/find-board.dto';

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
      existsBy: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      save: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      remove: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
    };

    const boardsRepositoryMock = {
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(validBoard)),
      findBy: jest.fn().mockImplementation(() => Promise.resolve([validBoard])),
      create: jest.fn().mockImplementation(() => Promise.resolve(validBoard)),
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

  it('should save board', async () => {
    const dto = { name: validBoard.name } as CreateBoardDto;
    expect(await service.create(dto, validUser.id)).toEqual(validBoard);
  });

  it('should throw an exception on create()', async () => {
    // Arrange
    const dto = { name: validBoard.name } as CreateBoardDto;
    jest.spyOn(usersRepository, 'existsBy').mockImplementation(() => null);

    // Act & Assert
    expect(() => service.create(dto, validUser.id)).rejects.toThrow("User doesn't exists");
  });

  it('should find boards', async () => {
    const dto = { name: validBoard.name } as FindBoardDto;
    expect(await service.findBy(dto, validUser.id)).toEqual([validBoard]);
  });

  it('should throw an exception on findBy()', async () => {
    // Arrange
    const dto = { name: validBoard.name } as FindBoardDto;
    jest.spyOn(usersRepository, 'existsBy').mockImplementation(() => null);

    // Act & Assert
    expect(() => service.findBy(dto, validUser.id)).rejects.toThrow("User doesn't exists");
  });

  it('should update board', async () => {
    // Act
    await service.update(validBoard.id, { isArchived: true }, validUser.id);

    // Assert
    expect(boardsRepository.save).toHaveBeenCalledWith({ ...validBoard, isArchived: true });
  });

  it('should remove board', async () => {
    // Act
    await service.remove(validBoard.id, validUser.id);

    // Assert
    expect(boardsRepository.remove).toHaveBeenCalledWith(validBoard);
  });
});
