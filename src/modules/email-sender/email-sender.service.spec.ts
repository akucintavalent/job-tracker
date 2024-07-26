import { Test, TestingModule } from '@nestjs/testing';
import { EmailSenderService } from './email-sender.service';

describe('EmailSenderService', () => {
  let service: EmailSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSenderService],
    }).compile();

    service = module.get<EmailSenderService>(EmailSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
