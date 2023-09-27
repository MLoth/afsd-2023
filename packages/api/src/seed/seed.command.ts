import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'
import { ObservationsService } from 'src/observations/observations.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:database:birds',
    describe: 'Seed the database with birds',
  })
  async seedBirds() {
    console.info('🪺 Start seeding of birds')
    const birds = await this.seedService.addBirdsFromJson()
    console.info(`🐣 ${birds.length} Birds are added`)
  }

  @Command({
    command: 'seed:database:observations',
    describe: 'Seed the database with random observations',
  })
  async seedObservations() {
    console.info('🔎 Start seeding of observation')

    const obs = await this.seedService.addObservationsFromJson()
    console.info(`🐣 ${obs.length} Observations are added`)
  }

  @Command({
    command: 'seed:reset:birds',
    describe: 'Delete all data from the birds table',
  })
  async deleteBirds() {
    console.info('🔪 Start deleting birds')
    await this.seedService.deleteAllBirds()
    console.info('🪶 Removed birds')
  }

  @Command({
    command: 'seed:reset:observations',
    describe: 'Delete all observations from the observation table',
  })
  async deleteObservations() {
    console.info('🔪 Start deleting observations')
    await this.seedService.deleteAllObservations()
    console.info('😵 Removed observation')
  }

  @Command({
    command: 'seed:reset:locations',
    describe: 'Delete all observations from the observation table',
  })
  async deleteLocations() {
    console.info('🔪 Start deleting locations')
    await this.seedService.deleteAllLocations()
    console.info('📍 Removed locations')
  }

  @Command({
    command: 'seed:reset',
    describe: 'Delete all observations from the observation table',
  })
  async deleteAll() {
    await this.deleteLocations()
    await this.deleteObservations()
    await this.deleteBirds()
  }
}
