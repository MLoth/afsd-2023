import { Module } from '@nestjs/common'
import { NotificationsGateway } from './notifications.gateway'
import { LivelocationsModule } from 'src/livelocations/livelocations.module'
import { LocationsModule } from 'src/locations/locations.module'

@Module({
  imports: [LivelocationsModule, LocationsModule],
  providers: [NotificationsGateway],
})
export class NotificationsModule {}
