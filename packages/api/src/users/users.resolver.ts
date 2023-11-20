import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  ObjectType,
  Field,
} from '@nestjs/graphql'
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
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @FirebaseUser() user: UserRecord,
  ) {
    const newUser = this.usersService.create(user.uid, createUserInput)
    const myMsg = new MySubscriptionMessage(
      'Hi Birdies, a new user was created',
      user.email,
    )
    pubSub.publish('newUserWasCreated', { newUserWasCreated: myMsg })
    return newUser
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

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @FirebaseUser() user: UserRecord,
  ) {
    return this.usersService.update(user.uid, updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args('string', { type: () => String }) id: string) {
    return this.usersService.remove(id)
  }

  @Subscription(() => MySubscriptionMessage)
  newUserWasCreated() {
    return pubSub.asyncIterator('newUserWasCreated')
  }
}

@ObjectType()
class MySubscriptionMessage {
  constructor(content: string, who: string) {
    this.content = content
    this.who = who
  }

  @Field()
  content: string
  @Field()
  who: string
}
