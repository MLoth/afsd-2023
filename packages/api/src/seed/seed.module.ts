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
export class SeedModule {}
