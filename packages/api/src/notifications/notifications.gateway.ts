import {
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets'
import { LivelocationsService } from 'src/livelocations/livelocations.service'
import { LocationsService } from 'src/locations/locations.service'

@WebSocketGateway(+process.env.WS_PORT || 3004, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.URL_FRONTEND,
    ],
    credentials: true,
  },
})
export class NotificationsGateway {
  constructor(
    private readonly livelocationsService: LivelocationsService,
    private readonly locationsService: LocationsService,
  ) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {

    return 'Hello world!'
  }
}
