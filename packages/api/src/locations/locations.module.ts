import { Module } from '@nestjs/common'
import { LocationsService } from './locations.service'
import { LocationsResolver } from './locations.resolver'
import { Location } from './entities/location.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationsResolver, LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
