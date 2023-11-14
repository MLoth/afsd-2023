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
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard'
import { FirebaseUser } from 'src/authentication/decorators/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { NotificationsGateway } from 'src/notifications/notifications.gateway'

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(
    private readonly observationsService: ObservationsService,
    private readonly birdsService: BirdsService,
    private readonly locationsService: LocationsService,
    private readonly gateway: NotificationsGateway,
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

      const location = await this.locationsService.findLocationByPoint(
        observation.geolocation,
      )
      console.log('Is the observation in a known area?', location)
      if (location.length > 0) {
        this.gateway.sendBirdObservationToRoom(location[0].name, observation)
      }

      return observation
    } catch (err) {
      console.log(err)
      return err
    }
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Observation], { name: 'observations' })
  findAll(@FirebaseUser() user: UserRecord) {
    // TODO: check admin role
    return this.observationsService.findAll(user.uid)
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.observationsService.findOne(id)
  }

  @Mutation(() => String)
  updateObservation(
    @Args('updateObservationInput')
    updateObservationInput: UpdateObservationInput,
  ): string {
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
