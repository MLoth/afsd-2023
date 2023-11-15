import { InputType, Field } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator'
import { Point } from 'geojson'
import { GeoPoint } from 'src/observations/entities/geopoint.entity'

@InputType()
export class CreateLivelocationInput {
  @IsMongoId() //validation
  @IsNotEmpty() //validation
  @Field(() => String, { description: 'User id' })
  idUser: string

  @IsNotEmpty() //validation
  @ValidateNested() //validation
  @Type(type => GeoPoint) //class-transfomer, do not forget this, otherwise validation of nested object will not work
  @Field(() => GeoPoint, { description: 'Geolocation' })
  geolocation: Point
}
