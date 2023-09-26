import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

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
    command: 'seed:reset:birds',
    describe: 'Delete all data from the birds table',
  })
  async delete() {
    console.info('🔪 Start deleting birds')
    await this.seedService.deleteAllBirds()
    console.info('🪶 Removed birds')
  }
}
