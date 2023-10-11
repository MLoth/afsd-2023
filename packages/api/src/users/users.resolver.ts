import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { Role, User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard'
import { UserRecord } from 'firebase-admin/auth'
import { FirebaseUser } from 'src/authentication/decorators/user.decorator'
import { AllowedRoles } from './decorators/role.decorator'
import { RolesGuard } from './guards/roles.guard'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @FirebaseUser() user: UserRecord,
  ) {
    return this.usersService.create(user.uid, createUserInput)
  }

  @AllowedRoles(Role.ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('string', { type: () => String }) id: string) {
    return this.usersService.findOne(id)
  }

  @Query(() => User, { name: 'userByUid' })
  findOneByUid(@Args('string', { type: () => String }) id: string) {
    return this.usersService.findOneByUid(id)
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args('string', { type: () => String }) id: string) {
    return this.usersService.remove(id)
  }
}
