import { Field, InputType, ObjectType } from '@nestjs/graphql'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  Equals,
  IsNotEmpty,
} from 'class-validator'
import { Point } from 'geojson'

@InputType('GeoPointInput') //and use this as an input type
@ObjectType()
export class GeoPoint implements Point {
  @IsNotEmpty()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @Field(() => [Number])
  coordinates: number[]

  @IsNotEmpty()
  @Equals('Point')
  @Field()
  type: 'Point'
}
