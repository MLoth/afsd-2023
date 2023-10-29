import { InputType, Int, Field } from '@nestjs/graphql'
import { Point } from 'geojson'
import { GeoPolygon } from 'src/locations/entities/geopolygon.entity'

@InputType()
export class CreateLivelocationInput {
  @Field(() => String, { description: 'User id' })
  idUser: string

  @Field(() => GeoPolygon, { description: 'Geolocation' })
  geolocation: Point
}
