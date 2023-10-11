import { SetMetadata } from '@nestjs/common'
import { Role } from '../entities/user.entity'

export const ROLES_KEY = 'roles'

export const AllowedRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
