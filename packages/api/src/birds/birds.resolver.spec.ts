import { Test, TestingModule } from '@nestjs/testing'
import { BirdsResolver } from './birds.resolver'
import { birdStub } from './stubs/birds.stub'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'

import { BirdsService } from './birds.service'
jest.mock('./birds.service')

describe('BirdsResolver', () => {
  let resolver: BirdsResolver
  let mockedService: BirdsService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsResolver,
        BirdsService,
        // {
        //   provide: BirdsService,
        //   useValue: {
        //     findAll: jest.fn().mockResolvedValue(birdStub()),
        //     findOneById: jest.fn().mockResolvedValue(birdStub()),
        //     findOneByName: jest.fn().mockResolvedValue(birdStub()),
        //     findBirdsByCategory: jest.fn().mockResolvedValue([birdStub()]),
        //     findBirdsBySearchString: jest.fn().mockResolvedValue([birdStub()]),
        //     create: jest.fn().mockResolvedValue(birdStub()),
        //     incrementObservationsCount: jest.fn(),
        //     saveAll: jest.fn().mockResolvedValue([birdStub()]),
        //   },
        // },
      ],
    }).compile()

    resolver = module.get<BirdsResolver>(BirdsResolver)
    mockedService = module.get<BirdsService>(BirdsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createBird', () => {
    let myBirdDTO: CreateBirdInput
    let resultBird: Bird

    beforeEach(async () => {
      myBirdDTO = {
        name: birdStub().name,
        fullname: birdStub().fullname,
        category: birdStub().category,
        url: birdStub().url,
        observations: birdStub().observations,
        description: birdStub().description,
      }
      resultBird = await resolver.createBird(myBirdDTO)
    })

    it('should call birdsService.create one time', async () => {
      expect(mockedService.create).toBeCalledTimes(1)
    })

    it('should call birdsService.create with the correct parameters', async () => {
      expect(mockedService.create).toBeCalledWith(myBirdDTO)
    })

    it('should return the created bird', async () => {
      expect(resultBird).toEqual(birdStub())
    })
  })
})
