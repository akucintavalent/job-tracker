import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserCodeVerificationService } from './user-code-verification.service';
import { Repository } from 'typeorm';
import { UserRole } from './enums/user-role.enum';
import { UserCodeVerification } from './entities/user.code.verification.entity';
import { EmailSenderService } from '../email-sender/email-sender.service';

describe('UserCodeVerificationService', () => {
  let service: UserCodeVerificationService;
  let repository: Repository<UserCodeVerification>;
  let userRepository: Repository<User>;
  let emailSender: EmailSenderService;

  const validUser = {
    id: '8167a958-5d55-476a-8bd2-f5fcdb8e9c5b',
    email: 'user@email.com',
    role: UserRole.USER,
  } as User;

  const validUserCode = {
    id: '72abcf90-5d55-476a-8bd2-f5fcdb8e9c5b',
    code: '000000',
    user: validUser,
    process: 'USER_SIGNUP',
  } as UserCodeVerification;

  beforeEach(async () => {
    const userRepositoryMock = {
      findOne: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      save: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
      remove: jest.fn().mockImplementation(() => Promise.resolve(validUser)),
    };

    const repositoryMock = {
      create: jest.fn().mockImplementation(() => validUserCode),
      save: jest.fn().mockImplementation(() => validUserCode),
    };

    const repositoryToken = getRepositoryToken(UserCodeVerification);
    const userRepositoryToken = getRepositoryToken(User);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCodeVerificationService,
        { provide: repositoryToken, useValue: repositoryMock },
        { provide: userRepositoryToken, useValue: userRepositoryMock },
        { provide: EmailSenderService, useValue: {} },
      ],
    }).compile();

    service = module.get<UserCodeVerificationService>(UserCodeVerificationService);
    emailSender = module.get<EmailSenderService>(EmailSenderService);
    repository = module.get<Repository<UserCodeVerification>>(repositoryToken);
    userRepository = module.get<Repository<User>>(userRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(emailSender).toBeDefined();
    expect(repository).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should save verification code', async () => {
    expect(await service.createVerificationCode(validUser.email, validUserCode.process)).toEqual(
      validUserCode.code,
    );
    expect(repository.save).toHaveBeenCalledWith(validUserCode);
  });

  it('should throw exception when user is invalid', async () => {
    jest.spyOn(userRepository, 'findOne').mockImplementation(() => null);
    expect(
      async () => await service.createVerificationCode(validUser.email, validUserCode.process),
    ).rejects.toThrow();
    expect(repository.save).toHaveBeenCalledTimes(0);
  });
});
