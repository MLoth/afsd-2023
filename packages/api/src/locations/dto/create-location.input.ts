import { InputType, Field } from '@nestjs/graphql'
import { Polygon } from 'geojson'
import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { GeoPolygon } from '../entities/geopolygon.entity'

@InputType()
export class CreateLocationInput {
  @IsString() //validation
  @IsNotEmpty() //validation
  @MinLength(5) //validation
  @Field()
  name: string

  @IsNotEmpty() //validation
  @ValidateNested() //validation
  @Type(type => GeoPolygon) //class-transfomer, do not forget this, otherwise validation of nested object will not work
  @Field(() => GeoPolygon)
  area: Polygon
}
