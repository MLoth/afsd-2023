import { Injectable } from '@nestjs/common'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Observation } from './entities/observation.entity'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { BirdsService } from 'src/birds/birds.service'
import { LocationsService } from 'src/locations/locations.service'

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
    private readonly birdsService: BirdsService,
    private readonly locationsService: LocationsService,
  ) {}

  async create(
    createObservationInput: CreateObservationInput,
    userUid: string,
  ): Promise<Observation> {
    try {
      // check if bird exists
      const bird = await this.birdsService.findOneById(
        createObservationInput.birdId,
      )
      if (!bird) {
        throw new Error('Bird not found')
      }

      // create observation
      const o = new Observation()
      o.userUid = userUid
      o.birdId = new ObjectId(createObservationInput.birdId)
      o.locationId = new ObjectId(createObservationInput.locationId)
      o.description = createObservationInput.description
      o.geolocation = createObservationInput.geolocation

      // increment bird observations count
      await this.birdsService.incrementObservationsCount(
        createObservationInput.birdId,
      )
      const newObservation = await this.observationRepository.save(o)

      // add observation to location
      await this.locationsService.addObservation(o.locationId, newObservation)

      return newObservation
    } catch (err) {
      throw err
    }
  }

  findAll(uid?: string) {
    if (uid) {
      return this.observationRepository.find({
        where: { userUid: uid },
      })
    } else return this.observationRepository.find()
  }

  findOne(id: string) {
    // @ts-ignore
    return this.observationRepository.findOneBy({ _id: new ObjectId(id) })
  }

  update(id: number, updateObservationInput: UpdateObservationInput) {
    throw new Error('Method not implemented.')
    return `Todo`
  }

  remove(id: number) {
    throw new Error('Method not implemented.')
    return `Todo`
  }

  // Function for seeding
  truncate(): Promise<void> {
    return this.observationRepository.clear()
  }
}
