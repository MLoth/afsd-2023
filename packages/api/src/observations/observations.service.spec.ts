import { Test, TestingModule } from '@nestjs/testing'
import { ObservationsService } from './observations.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Observation } from './entities/observation.entity'
import {
  createObservationInputStub,
  observationStub,
} from './stubs/observations.stub'
import { birdStub } from 'src/birds/stubs/birds.stub'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { LocationsService } from 'src/locations/locations.service'
import { CreateObservationInput } from './dto/create-observation.input'

import { BirdsService } from 'src/birds/birds.service'
jest.mock('src/birds/birds.service') // use the __mock__

describe('ObservationsService', () => {
  let service: ObservationsService
  let mockObservationRepository: Repository<Observation>
  let mockedBirdsService: BirdsService
  let mockedLocationsService: LocationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObservationsService,
        {
          provide: getRepositoryToken(Observation),
          useValue: {
            save: jest.fn().mockResolvedValue(observationStub()),
          },
        },
        BirdsService, // use the __mock__
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
        {
          provide: LocationsService,
          useValue: {
            addObservation: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ObservationsService>(ObservationsService)
    mockObservationRepository = module.get<Repository<Observation>>(
      getRepositoryToken(Observation),
    )
    mockedBirdsService = module.get<BirdsService>(BirdsService)
    mockedLocationsService = module.get<LocationsService>(LocationsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should call observation repo .create one time', async () => {
      const myObservation = createObservationInputStub()
      const saveSpy = jest.spyOn(mockObservationRepository, 'save')
      await service.create(myObservation, myObservation.userUid)
      expect(saveSpy).toBeCalledTimes(1)
    })

    it('should call incrementObservationsCount with correct parameters', async () => {
      const myObservation = createObservationInputStub()
      const incrementSpy = jest.spyOn(
        mockedBirdsService,
        'incrementObservationsCount',
      )
      await service.create(myObservation, myObservation.userUid)
      expect(incrementSpy).toBeCalledWith(myObservation.birdId)
    })

    it('should call addObservation on the location service with correct parameters', async () => {
      const myObservation: CreateObservationInput = createObservationInputStub()
      const addLocationObservSpy = jest.spyOn(
        mockedLocationsService,
        'addObservation',
      )

      await service.create(myObservation, myObservation.userUid)
      let res = observationStub()

      expect(addLocationObservSpy).toBeCalledWith(res.locationId, res)
    })

    it('should return an error if the bird does not exist', async () => {
      const myObservation: CreateObservationInput = createObservationInputStub()
      jest.spyOn(mockedBirdsService, 'findOneById').mockResolvedValue(null)
      await expect(
        service.create(myObservation, myObservation.userUid),
      ).rejects.toThrowError('Bird not found')
    })

  })
})
