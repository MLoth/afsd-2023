import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { Observation } from './entities/observation.entity'
import { BirdsModule } from 'src/birds/birds.module'
import { LocationsModule } from 'src/locations/locations.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Observation]),
    BirdsModule,
    LocationsModule,
  ],
  providers: [ObservationsResolver, ObservationsService],
  exports: [ObservationsService],
})
export class ObservationsModule {}
