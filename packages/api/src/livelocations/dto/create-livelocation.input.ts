import { InputType, Int, Field } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Point } from 'geojson'
import { GeoPolygon } from 'src/locations/entities/geopolygon.entity'

@InputType()
export class CreateLivelocationInput {
  @IsMongoId() //validation
  @IsNotEmpty() //validation
  @Field(() => String, { description: 'User id' })
  idUser: string

  @IsNotEmpty() //validation
  @ValidateNested() //validation
  @Type(type => GeoPolygon) //class-transfomer, do not forget this, otherwise validation of nested object will not work
  @Field(() => GeoPolygon, { description: 'Geolocation' })
  geolocation: Point
}
