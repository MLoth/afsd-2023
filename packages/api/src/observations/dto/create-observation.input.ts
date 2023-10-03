import { InputType, Field } from '@nestjs/graphql'
import { GeoPoint } from '../entities/geopoint.entity'
import { Point } from 'geojson'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class CreateObservationInput {
  @IsNotEmpty()
  @Field()
  userUid: string

  @IsNotEmpty()
  @Field()
  birdId: string

  @IsNotEmpty()
  @Field()
  locationId: string

  @IsString()
  @IsNotEmpty()
  @Field()
  description?: string

  @IsNotEmpty() //validation
  @ValidateNested() //validation
  @Type(type => GeoPoint) //validation - class-transfomer - do not forget this, otherwise validation of nested object will not work
  @Field(() => GeoPoint)
  geolocation: Point
}
