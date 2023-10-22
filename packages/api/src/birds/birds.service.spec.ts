import { Test, TestingModule } from '@nestjs/testing'
import { BirdsService } from './birds.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Bird } from './entities/bird.entity'
import { Repository } from 'typeorm'
import { CreateBirdInput } from './dto/create-bird.input'
import { birdStub, createbirdInputStub } from './stubs/birds.stub'
import { ObjectId } from 'mongodb'

describe('BirdsService', () => {
  let service: BirdsService
  let mockBirdRepository: Repository<Bird>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsService,
        {
          provide: getRepositoryToken(Bird),
          useValue: {
            save: jest.fn().mockResolvedValue(birdStub()),
            find: jest.fn().mockResolvedValue([birdStub()]),
            findOne: jest.fn().mockResolvedValue(birdStub()),
            update: jest.fn(),
            // delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<BirdsService>(BirdsService)
    mockBirdRepository = module.get<Repository<Bird>>(getRepositoryToken(Bird))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should call birdRepository.create one time', async () => {
      const myTestBird = new Bird()
      const saveSpy = jest.spyOn(mockBirdRepository, 'save')
      await service.create(myTestBird)
      expect(saveSpy).toBeCalledTimes(1)
    })

    it('should call bridRepository.save with the correct parameters', async () => {
      const myTestBird: CreateBirdInput = createbirdInputStub()
      const saveSpy = jest.spyOn(mockBirdRepository, 'save')

      await service.create(myTestBird)

      expect(saveSpy).toBeCalledWith(myTestBird)
    })

    it('should return the created bird', async () => {
      const myTestBirdInput = createbirdInputStub()
      const myBirdOutput = birdStub()

      const r = await service.create(myTestBirdInput)
      expect(r).toEqual(myBirdOutput)
    })
  })

  describe('findAll', () => {
    it('should call birdRepository.find one time', async () => {
      const findSpy = jest.spyOn(mockBirdRepository, 'find')
      await service.findAll()
      expect(findSpy).toBeCalledTimes(1)
    })

    it('should return an array of birds', async () => {
      const myBird = birdStub()
      const r = await service.findAll()
      expect(r).toEqual([myBird])
    })
  })

  describe('findOneById', () => {
    it('should call birdRepository.findOne one time', async () => {
      const findOneSpy = jest.spyOn(mockBirdRepository, 'findOne')
      await service.findOneById('652e5989204b1d8ef65ed992')
      expect(findOneSpy).toBeCalledTimes(1)
    })

    it('should call birdRepository.findOne with the correct parameters', async () => {
      const findOneSpy = jest.spyOn(mockBirdRepository, 'findOne')
      await service.findOneById('652e5989204b1d8ef65ed992')
      expect(findOneSpy).toBeCalledWith({
        _id: new ObjectId('652e5989204b1d8ef65ed992'),
      })
    })

    it('should return the bird', async () => {
      const myBird = birdStub()
      const r = await service.findOneById('652e5989204b1d8ef65ed992')
      expect(r).toEqual(myBird)
    })

    it('should return an error when no valid id is given', async () => {
      try {
        const r = await service.findOneById('abc')
      } catch (e) {
        expect(e.message).toEqual('Invalid ObjectId')
      }
    })
  })

  describe('incrementObservationCount', () => {
    it('should call birdRepository.findOne one time', async () => {
      const findOneSpy = jest.spyOn(mockBirdRepository, 'findOne')
      const b = birdStub()
      await service.incrementObservationsCount(b.id)
      expect(findOneSpy).toBeCalledTimes(1)
    })

    it('should call birdRepository.findOne with the correct parameters', async () => {
      const findOneSpy = jest.spyOn(mockBirdRepository, 'findOne')
      const b = birdStub()
      await service.incrementObservationsCount(b.id)
      expect(findOneSpy).toBeCalledWith({
        _id: new ObjectId(b.id),
      })
    })

    it('should call birdRepository.update one time', async () => {
      const updateSpy = jest.spyOn(mockBirdRepository, 'update')
      const b = birdStub()
      await service.incrementObservationsCount(b.id)
      expect(updateSpy).toBeCalledTimes(1)
    })

    it('should call birdRepository.update with the correct parameters', async () => {
      const updateSpy = jest.spyOn(mockBirdRepository, 'update')
      const b = birdStub()
      await service.incrementObservationsCount(b.id)
      expect(updateSpy).toBeCalledWith(
        { id: b.id },
        { observations: b.observations + 1 },
      )
    })
  })
})
