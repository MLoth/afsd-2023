import { Injectable } from '@nestjs/common'

import { BirdsService } from 'src/birds/birds.service'
import { ObservationsService } from 'src/observations/observations.service'
import { Bird } from 'src/birds/entities/bird.entity'
import { Observation } from 'src/observations/entities/observation.entity'
import { GeoPoint } from 'src/observations/entities/geopoint.entity'
import { CreateObservationInput } from 'src/observations/dto/create-observation.input'
import { CreateLocationInput } from 'src/locations/dto/create-location.input'
import { LocationsService } from 'src/locations/locations.service'

import * as birds from 'src/seed/data/birds.json'
import * as locations from 'src/seed/data/locations.json'

@Injectable()
export class SeedService {
  constructor(
    private birdsService: BirdsService,
    private observationsService: ObservationsService,
    private locationsService: LocationsService,
  ) {}

  async addBirdsFromJson(): Promise<Bird[]> {
    let theBirds: Bird[] = []

    for (let bird of birds) {
      const b = new Bird()
      b.name = bird.name
      b.fullname = bird.fullname
      b.category = bird.category
      b.observations = 0
      b.url = bird.url
      b.description = bird.description

      theBirds.push(b)
    }

    try {
      return this.birdsService.saveAll(theBirds)
    } catch (error) {
      console.log(error)
    }
  }

  async addObservationsFromJson(): Promise<Observation[]> {
    const obs: Array<Observation> = []
    for (const myLocation of locations) {
      const loc = new CreateLocationInput()
      loc.name = myLocation.name
      loc.area = {
        coordinates: myLocation.Polygon.coordinates,
        type: 'Polygon',
      }

      const newLoc = await this.locationsService.create(loc)

      for (const observation of myLocation.birds) {
        const b = await this.birdsService.findOneByName(observation.name)

        const myObservation = new CreateObservationInput()
        myObservation.birdId = b.id
        myObservation.locationId = newLoc.id.toString()
        const geo = new GeoPoint()
        geo.type = 'Point'
        geo.coordinates = observation.point
        myObservation.geolocation = geo
        myObservation.userUid = '1234'
        const createdObservation = await this.observationsService.create(
          myObservation,
          '1234',
        )
        obs.push(createdObservation)
      }
    }
    return Promise.resolve(obs)
  }

  async deleteAllBirds(): Promise<void> {
    return this.birdsService.truncate()
  }

  async deleteAllObservations(): Promise<void> {
    return this.observationsService.truncate()
  }

  async deleteAllLocations(): Promise<void> {
    return this.locationsService.truncate()
  }
}
