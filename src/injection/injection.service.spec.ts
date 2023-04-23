import { Test, TestingModule } from '@nestjs/testing';
import { InjectionService } from './injection.service';

describe('InjectionService', () => {
  let service: InjectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InjectionService],
    }).compile();

    service = module.get<InjectionService>(InjectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
