import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { LocationsService } from './locations.service'
import { Location } from './entities/location.entity'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'
import { GeoPoint } from 'src/observations/entities/geopoint.entity'
import { Point } from 'typeorm'

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Mutation(() => Location)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ) {
    return this.locationsService.create(createLocationInput)
  }

  @Query(() => [Location], { name: 'locations' })
  findAll() {
    return this.locationsService.findAll()
  }

  @Query(() => Location, { name: 'location' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.locationsService.findOne(id)
  }

  @Mutation(() => Location)
  updateLocation(
    @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
  ) {
    return this.locationsService.update(
      updateLocationInput.id,
      updateLocationInput,
    )
  }

  @Mutation(() => Location)
  removeLocation(@Args('id', { type: () => Int }) id: number) {
    return this.locationsService.remove(id)
  }

  @Query(() => [Location], { name: 'findAreaByPoint' })
  findAreaByPoint(
    @Args('point', { type: () => GeoPoint }) p: Point,
  ): Promise<Location[]> {
    return this.locationsService.findLocationByPoint(p)
  }
}
