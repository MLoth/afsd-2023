import { Test, TestingModule } from '@nestjs/testing';
import { BirdsService } from './birds.service';

describe('BirdsService', () => {
  let service: BirdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BirdsService],
    }).compile();

    service = module.get<BirdsService>(BirdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
