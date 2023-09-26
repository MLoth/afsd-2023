import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { BirdsService } from './birds.service'
import { Bird } from './entities/bird.entity'
import { CreateBirdInput } from './dto/create-bird.input'
import { UpdateBirdInput } from './dto/update-bird.input'

@Resolver(() => Bird)
export class BirdsResolver {
  constructor(private readonly birdsService: BirdsService) {}

  @Mutation(() => Bird)
  createBird(@Args('createBirdInput') createBirdInput: CreateBirdInput) {
    return this.birdsService.create(createBirdInput)
  }

  @Query(() => [Bird], { name: 'birds' })
  findAll() {
    // return [
    //   {
    //     id: '1',
    //     name: 'Duif',
    //     fullname: 'Duif',
    //     category: 'Roekoes',
    //     url: 'test',
    //     observations: 1,
    //     description: 'test',
    //     active: true,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]
    return this.birdsService.findAll()
  }

  @Query(() => Bird, { name: 'bird' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.birdsService.findOne(id)
  }

  @Mutation(() => Bird)
  updateBird(@Args('updateBirdInput') updateBirdInput: UpdateBirdInput) {
    return this.birdsService.update(updateBirdInput.id, updateBirdInput)
  }

  @Mutation(() => Bird)
  removeBird(@Args('id', { type: () => Int }) id: number) {
    return this.birdsService.remove(id)
  }
}
