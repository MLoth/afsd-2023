import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { LivelocationsService } from './livelocations.service'
import { UsersService } from '../users/users.service'
import { Livelocation } from './entities/livelocation.entity'
import { CreateLivelocationInput } from './dto/create-livelocation.input'
import { User } from '../users/entities/user.entity'

@Resolver(() => Livelocation)
export class LivelocationsResolver {
  constructor(
    private readonly livelocationsService: LivelocationsService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => Livelocation)
  createLivelocation(
    @Args('createLivelocationInput')
    createLivelocationInput: CreateLivelocationInput,
  ) {
    return this.livelocationsService.create(createLivelocationInput)
  }

  @Query(() => Livelocation, { name: 'userLastlivelocation' })
  findOneByUserId(@Args('idUser', { type: () => String }) id: string) {
    return this.livelocationsService.findLastByUserID(id)
  }

  @ResolveField()
  user(@Parent() oLiveLoc: Livelocation): Promise<User> {
    return this.userService.findOne(oLiveLoc.idUser)
  }
}
