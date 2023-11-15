import { Module } from '@nestjs/common'
import { NotificationsGateway } from './notifications.gateway'
import { LivelocationsModule } from 'src/livelocations/livelocations.module'
import { LocationsModule } from 'src/locations/locations.module'
import { AuthenticationModule } from 'src/authentication/authentication.module'
import { BirdsModule } from 'src/birds/birds.module'

@Module({
  imports: [
    LivelocationsModule,
    LocationsModule,
    AuthenticationModule,
    BirdsModule,
  ],
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
