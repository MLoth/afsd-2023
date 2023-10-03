import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class FirebaseGuard extends AuthGuard('firebase-auth') {
  getRequest(context: ExecutionContext) {
    // Alles bestaat al! We geven enkel door!
    // Heavy lifting has been done
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
