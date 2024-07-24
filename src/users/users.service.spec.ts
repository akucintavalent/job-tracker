import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BoardsService } from './../boards/boards.service';
import { UserCodeVerificationService } from './user.code.verification.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from './enums/user-role.enum';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let userCodeVerificationServiceMock: Partial<UserCodeVerificationService>;
  let boardServiceMock: Partial<BoardsService>;

  const validUser = {
    id: '8167a958-5d55-476a-8bd2-f5fcdb8e9c5b',
    email: 'user@email.com',
    role: UserRole.USER,
  } as User;

  beforeEach(async () => {
    userCodeVerificationServiceMock = {};
    boardServiceMock = {};
    const repositoryMock = {
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      save: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
    };

    const repositoryToken = getRepositoryToken(User);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: repositoryToken, useValue: repositoryMock },
        { provide: UserCodeVerificationService, useValue: userCodeVerificationServiceMock },
        { provide: BoardsService, useValue: boardServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(repositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user', async () => {
    // Act & Assert
    expect(await service.findOneBy({ email: validUser.email })).toEqual({
      id: validUser.id,
      email: validUser.email,
      role: validUser.role,
    });
  });

  it('should throw NotFoundException', async () => {
    // Arrange
    jest.spyOn(repository, 'findOneBy').mockImplementation(() => null);

    // Act & Assert
    expect(() => service.findOneBy({ email: 'user@email.com' })).toThrow(NotFoundException);
  });

  it('should update user', async () => {
    // Act
    await service.update(validUser.id, { role: UserRole.ADMIN });

    // Assert
    expect(repository.save).toHaveBeenCalledWith({ ...validUser, role: UserRole.ADMIN });
  });
});
