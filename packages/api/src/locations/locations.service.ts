import { Injectable } from '@nestjs/common'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Location } from './entities/location.entity'
import { MongoRepository } from 'typeorm'
import { Observation } from 'src/observations/entities/observation.entity'
import { ObjectId } from 'mongodb'
import { Point } from 'geojson'

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: MongoRepository<Location>,
  ) {}

  create(createLocationInput: CreateLocationInput) {
    const l = new Location()
    l.name = createLocationInput.name
    l.area = createLocationInput.area
    l.lastObservations = []
    return this.locationRepository.save(l)
  }

  findAll() {
    return this.locationRepository.find()
  }

  findOne(id: string) {
    // @ts-ignore
    return this.locationRepository.findOne({ _id: new ObjectId(id) })
  }

  update(id: number, updateLocationInput: UpdateLocationInput) {
    throw new Error('Method not implemented.')
    return `This action updates a #${id} location`
  }

  remove(id: number) {
    throw new Error('Method not implemented.')
    return `This action removes a #${id} location`
  }

  async addObservation(locationId: ObjectId, observation: Observation) {
    const location = await this.locationRepository.findOne({
      //@ts-ignore
      _id: new ObjectId(locationId),
    })

    if (!location) {
      throw new Error('Location not found')
    }

    //if there are more than 3 observations, remove the oldest one
    if (location.lastObservations.length >= 3) {
      location.lastObservations.shift()
    }

    location.lastObservations.push(observation)
    return this.locationRepository.save(location)
  }

  findLocationByPoint(p: Point): Promise<Location[]> {
    return this.locationRepository.find({
      where: {
        area: {
          $geoIntersects: {
            $geometry: p,
          },
        },
      },
    })
  }

  // for seeding
  truncate(): Promise<void> {
    return this.locationRepository.clear()
  }
}
