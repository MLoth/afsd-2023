import { Injectable } from '@nestjs/common'
import { CanActivate } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { FirebaseService } from '../services/firebase.service'

@Injectable()
export class FirebaseWebsocketGuard implements CanActivate {
  constructor(private readonly firebase: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient()
    console.log('FirebaseWebsocketGuard')
    console.log(client)
    // Assuming you have some way to obtain user information from the WebSocket connection
    const user = await this.validateUserFromWebSocket(client)
    console.log('***user')
    console.log(user)
    if (!user) {
      throw new WsException('Unauthorized')
    }

    // If the user is authenticated, you can attach it to the WebSocket context
    context.switchToWs().getData().user = user

    return true
  }

  private async validateUserFromWebSocket(client: any): Promise<any> {
    // You need to implement your own logic to validate the user from the WebSocket connection
    // This might involve checking Firebase tokens or other authentication methods
    // Return the authenticated user or null if not authenticated
    // Example:
    // const authToken = client.handshake.auth.token;
    // const user = await yourValidationLogic(authToken);
    // return user;
    if (!client.handshake.headers.authorization) {
      throw new WsException('No authorization header')
    }
    const authToken = client.handshake.headers.authorization.replace(
      'Bearer ',
      '',
    )

    try {
      const user = await this.firebase.getAuth().verifyIdToken(authToken)
      console.log('authToken')
      console.log(authToken)
      console.log('user')
      console.log(user)
      return user
    } catch (err) {
      throw new WsException(err.message)
    }
  }
}
