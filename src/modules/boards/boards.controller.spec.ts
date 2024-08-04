import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardMapper } from './boards.mapper';

describe('BoardsController', () => {
  let controller: BoardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: BoardsService, useValue: {} },
        { provide: BoardMapper, useValue: {} },
      ],
      controllers: [BoardsController],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
