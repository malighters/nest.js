import { Test, TestingModule } from '@nestjs/testing';
import { InjectionController } from './injection.controller';
import { InjectionService } from './injection.service';

describe('InjectionController', () => {
  let controller: InjectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InjectionController],
      providers: [InjectionService],
    }).compile();

    controller = module.get<InjectionController>(InjectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
