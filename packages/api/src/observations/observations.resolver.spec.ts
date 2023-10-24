import { Test, TestingModule } from '@nestjs/testing'
import { ObservationsResolver } from './observations.resolver'
import { ObservationsService } from './observations.service'
import { BirdsService } from 'src/birds/birds.service'
import { LocationsService } from 'src/locations/locations.service'
import { CreateObservationInput } from './dto/create-observation.input'
import {
  createObservationInputStub,
  observationStub,
} from './stubs/observations.stub'

jest.mock('./observations.service') // use the __mock__ for the service
jest.mock('../birds/birds.service') // use the __mock__ for the service
jest.mock('../locations/locations.service') // use the __mock__ for the service

describe('ObservationsResolver', () => {
  let resolver: ObservationsResolver
  let mockedService: ObservationsService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObservationsResolver,
        ObservationsService, //is mocked
        BirdsService, //is mocked
        LocationsService, //is mocked
      ],
    }).compile()

    resolver = module.get<ObservationsResolver>(ObservationsResolver)
    mockedService = module.get<ObservationsService>(ObservationsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('create observation', () => {
    let myObsDTO: CreateObservationInput
    let resultObs

    beforeEach(async () => {
      myObsDTO = {
        birdId: createObservationInputStub().birdId,
        locationId: createObservationInputStub().locationId,
        description: createObservationInputStub().description,
        geolocation: createObservationInputStub().geolocation,
        userUid: createObservationInputStub().userUid,
      }
      resultObs = await resolver.createObservation(myObsDTO)
    })

    it('should call birdsService.create one time', async () => {
      expect(mockedService.create).toBeCalledTimes(1)
    })

    it('should call birdsService.create with the correct parameters', async () => {
      expect(mockedService.create).toBeCalledWith(myObsDTO, myObsDTO.userUid)
    })
  })
})
