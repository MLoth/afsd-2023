import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Role } from '../entities/user.entity'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ROLES_KEY } from '../decorators/role.decorator'
import { Reflector } from '@nestjs/core'
import { UsersService } from '../users.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  // RXJS

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) throw new Error('No roles defined')

    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req // WAAROM WERKT DIT? OMDAT WE ZELF AL GUARD HIERVOOR HEBBEN.
    const { role } = await this.usersService.findOneByUid(user.uid)

    return requiredRoles.includes(role)
  }
}
