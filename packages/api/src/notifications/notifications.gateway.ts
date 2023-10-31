import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateLivelocationInput } from 'src/livelocations/dto/create-livelocation.input'
import { Livelocation } from 'src/livelocations/entities/livelocation.entity'
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
export class NotificationsGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  constructor(
    private readonly livelocationsService: LivelocationsService,
    private readonly locationsService: LocationsService,
  ) {}

  @WebSocketServer() //An alternative for afterInit()
  server: Server

  numberOfClients: number = 0

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }

  handleDisconnect(client: Socket) {
    this.numberOfClients--
    console.log('client disconnected 👋')
    console.log('Number of clients on the server: ', this.numberOfClients)
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('birdspotter:newuserconnetected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('client connected')
    console.log(client.id)
    console.log(client.rooms)
    console.log('Number of clients on the server: ', this.numberOfClients)
  }

  @SubscribeMessage('birdspotter:moving')
  async handleNewLocation(
    @MessageBody() data: CreateLivelocationInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Livelocation>{

   console.log(data)
    const liveLoc = await this.livelocationsService.create(data)
    return liveLoc
  }

}
