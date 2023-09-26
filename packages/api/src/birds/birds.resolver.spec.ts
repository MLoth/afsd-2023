import { Test, TestingModule } from '@nestjs/testing';
import { BirdsResolver } from './birds.resolver';
import { BirdsService } from './birds.service';

describe('BirdsResolver', () => {
  let resolver: BirdsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BirdsResolver, BirdsService],
    }).compile();

    resolver = module.get<BirdsResolver>(BirdsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
