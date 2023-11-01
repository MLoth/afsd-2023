import { Module } from '@nestjs/common'
import { NotificationsGateway } from './notifications.gateway'
import { LivelocationsModule } from 'src/livelocations/livelocations.module'
import { LocationsModule } from 'src/locations/locations.module'
import { AuthenticationModule } from 'src/authentication/authentication.module'

@Module({
  imports: [LivelocationsModule, LocationsModule,AuthenticationModule],
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
