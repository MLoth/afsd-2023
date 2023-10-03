import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ObservationsService } from './observations.service'
import { Observation } from './entities/observation.entity'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { LocationsService } from 'src/locations/locations.service'
import { Location } from 'src/locations/entities/location.entity'

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(
    private readonly observationsService: ObservationsService,
    private readonly birdsService: BirdsService,
    private readonly locationsService: LocationsService,
  ) {}

  @Mutation(() => Observation)
  async createObservation(
    @Args('createObservationInput')
    createObservationInput: CreateObservationInput,
  ) {
    try {
      const observation = await this.observationsService.create(
        createObservationInput,
        createObservationInput.userUid,
      )

      return observation
    } catch (err) {
      console.log(err)
      return err
    }
  }

  @Query(() => [Observation], { name: 'observations' })
  findAll() {
    return this.observationsService.findAll()
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.observationsService.findOne(id)
  }

  @Mutation(() => Observation)
  updateObservation(
    @Args('updateObservationInput')
    updateObservationInput: UpdateObservationInput,
  ) {
    return this.observationsService.update(
      updateObservationInput.id,
      updateObservationInput,
    )
  }

  @Mutation(() => Observation)
  removeObservation(@Args('id', { type: () => Int }) id: number) {
    return this.observationsService.remove(id)
  }

  // // Resolve fields
  @ResolveField()
  bird(@Parent() o: Observation): Promise<Bird> {
    return this.birdsService.findOneById(o.birdId.toString())
  }

  @ResolveField()
  location(@Parent() o: Observation): Promise<Location> {
    return this.locationsService.findOne(o.locationId.toString())
  }
}
