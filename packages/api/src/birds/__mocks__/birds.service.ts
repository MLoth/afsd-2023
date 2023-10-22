import { birdStub } from '../stubs/birds.stub'

export const BirdsService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue(birdStub()),
  findOneById: jest.fn().mockResolvedValue(birdStub()),
  findOneByName: jest.fn().mockResolvedValue(birdStub()),
  findBirdsByCategory: jest.fn().mockResolvedValue([birdStub()]),
  findBirdsBySearchString: jest.fn().mockResolvedValue([birdStub()]),
  create: jest.fn().mockResolvedValue(birdStub()),
  incrementObservationsCount: jest.fn(),
  saveAll: jest.fn().mockResolvedValue([birdStub()]),
})
