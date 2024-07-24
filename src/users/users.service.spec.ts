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

  beforeEach(async () => {
    userCodeVerificationServiceMock = {};
    boardServiceMock = {};

    const repositoryToken = getRepositoryToken(User);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: repositoryToken, useValue: { findOneBy: jest.fn(), save: jest.fn() } },
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

  it('findOneBy user exists', async () => {
    // Arrange
    const entity = new User();
    entity.email = 'user@mail.com';
    jest.spyOn(repository, 'findOneBy').mockImplementation(() => Promise.resolve(entity));

    // Act
    const result = await service.findOneBy({ email: 'user@mail.com' });

    // Assert
    expect(result).toBe(entity);
  });

  it('findOneBy user missing', async () => {
    // Arrange
    jest.spyOn(repository, 'findOneBy').mockImplementation(() => null);

    // Act & Assert
    expect(() => service.findOneBy({ email: 'user@mail.com' })).toThrow(NotFoundException);
  });

  it('update, user exists, user updated', async () => {
    // Arrange
    const entity = new User();
    entity.email = 'user@mail.com';
    entity.role = UserRole.USER;
    jest.spyOn(repository, 'findOneBy').mockImplementation(() => Promise.resolve(entity));

    // Act
    await service.update('id', { role: UserRole.ADMIN });

    // Assert
    expect(repository.save).toHaveBeenCalledWith({ email: entity.email, role: UserRole.ADMIN });
  });
});
