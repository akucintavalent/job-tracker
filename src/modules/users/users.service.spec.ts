import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BoardsService } from '../boards/boards.service';
import { UserCodeVerificationService } from './user.code.verification.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from './enums/user-role.enum';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let userCodeVerificationServiceMock: UserCodeVerificationService;

  const validUser = {
    id: '8167a958-5d55-476a-8bd2-f5fcdb8e9c5b',
    email: 'user@email.com',
    role: UserRole.USER,
  } as User;

  beforeEach(async () => {
    const repositoryMock = {
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      save: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      remove: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
    };

    const repositoryToken = getRepositoryToken(User);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: repositoryToken, useValue: repositoryMock },
        { provide: UserCodeVerificationService, useValue: { verifyUserCode: jest.fn() } },
        { provide: BoardsService, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userCodeVerificationServiceMock = module.get<UserCodeVerificationService>(
      UserCodeVerificationService,
    );
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

  it('should delete user', async () => {
    // Act
    await service.remove(validUser.id, 'code');

    // Assert
    expect(repository.remove).toHaveBeenCalledWith(validUser);
  });

  it('should throw exception on delete user', async () => {
    // Arrange
    jest
      .spyOn(userCodeVerificationServiceMock, 'verifyUserCode')
      .mockImplementation(() => Promise.reject(new Error('unit test error')));

    // Act & Assert
    expect(async () => await service.remove(validUser.id, 'some code')).rejects.toThrow();
    expect(repository.remove).toHaveBeenCalledTimes(0);
  });
});
