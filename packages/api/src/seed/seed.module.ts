import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { BirdsModule } from 'src/birds/birds.module'
import { ObservationsModule } from 'src/observations/observations.module'
import { CommandModule } from 'nestjs-command'
import { DatabaseSeedCommand } from './seed.command'
import { LocationsModule } from 'src/locations/locations.module'

@Module({
  imports: [BirdsModule, ObservationsModule, LocationsModule, CommandModule],
  providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {
  async seedE2ETestDB() {
    console.debug('E2E_TEST running, seeding database')
    await this.seedService.addBirdsFromJson()
    await this.seedService.addObservationsFromJson()
  }

  constructor(private readonly seedService: SeedService) {
    if (process.env.E2E_TEST) this.seedE2ETestDB()
  }
}
