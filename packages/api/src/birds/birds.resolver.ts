import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Bird } from './entities/bird.entity'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'

@Resolver()
export class BirdsResolver {
  constructor(private readonly birdsService: BirdsService) {}

  @Query(() => [Bird], { name: 'birds' })
  getBirds() {
    return this.birdsService.findAll()
  }

  @Query(() => Bird, { name: 'bird', nullable: true }) //<- nullable: true, because we want to return null if no bird is found
  getBirdByName(@Args('name') name: string): Promise<Bird> {
    return this.birdsService.findOneByName(name)
  }

  @Query(() => Bird, { name: 'findBirdById', nullable: true }) //<- nullable: true, because we want to return null if no bird is found
  getBirdById(@Args('id') id: string): Promise<Bird> {
    return this.birdsService.findOneById(id)
  }

  @Query(() => [Bird], { name: 'findBirdsBySearchString' })
  findBirdsBySearchString(@Args('searchString') searchString: string) {
    return this.birdsService.findBirdsBySearchString(searchString)
  }

  @Mutation(() => Bird, { description: 'Create a bird using the DTO.' })
  createBird(
    @Args('createBirdInput') createBirdInput: CreateBirdInput,
  ): Promise<Bird> {
    return this.birdsService.create(createBirdInput)
  }
}
