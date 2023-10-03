import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Polygon } from 'geojson'
import {
  IsNotEmpty,
  Equals,
  IsArray,
  ArrayMinSize,
  ArrayNotEmpty,
} from 'class-validator'

@InputType('GeoPolygonInput')
@ObjectType()
export class GeoPolygon implements Polygon {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @Field(() => [[[Number]]])
  coordinates: number[][][]

  @IsNotEmpty()
  @Equals('Polygon')
  @Field()
  type: 'Polygon'
}
