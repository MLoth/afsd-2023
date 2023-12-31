import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { FirebaseWebsocketGuard } from 'src/authentication/guards/firebase.websocket.guard'
import { BirdsService } from 'src/birds/birds.service'
import { MyWebSocketValidationPipe } from 'src/bootstrap/exceptions/mywebsocket.validationpipe'
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
    private readonly birdService: BirdsService,
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

  @UseGuards(FirebaseWebsocketGuard)
  @UsePipes(new MyWebSocketValidationPipe())
  @SubscribeMessage('birdspotter:moving')
  async handleNewLocation(
    @MessageBody() data: CreateLivelocationInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Livelocation> {
    try {
      const liveLoc = await this.livelocationsService.create(data)
      const currentLoc = await this.locationsService.findLocationByPoint(
        liveLoc.geolocation,
      )
      if (currentLoc.length > 0) {
        const nameArea = currentLoc[0].name
        console.log('in a known area/location', nameArea)
        console.log('put in room')
        console.log(`Rooms of this client:`, client.rooms)
        //add client to room
        client.join(nameArea)
        console.log(`Rooms of this client:`, client.rooms)
        //send to all clients in room, except sender
        //client.to(nameArea).emit('birdspotter:newlocation', liveLoc)
        //send to all clients in room, including sender
        this.server.to(nameArea).emit('birdspotter:newlocation', {
          location: liveLoc,
          room: nameArea,
        })
      } else {
        console.log('not in a known area/location')
      }

      return liveLoc
    } catch (err) {
      console.error('Moving error', err.message)
      throw new WsException(err.message)
    }
  }

  // send bird observation to all clients in room
  async sendBirdObservationToRoom(roomName: string, observation: any) {
    const bird = await this.birdService.findOneById(observation.birdId)
    observation.bird = bird
    const location = await this.locationsService.findOne(observation.locationId)
    observation.location = location
    this.server.to(roomName).emit('bird:observation', observation)
  }
}
