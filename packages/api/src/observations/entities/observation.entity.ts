import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Bird } from 'src/birds/entities/bird.entity'
import { Point } from 'geojson'
import { GeoPoint } from './geopoint.entity'
import { Location } from 'src/locations/entities/location.entity'

@Entity()
@ObjectType()
export class Observation {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  userUid: string

  @Field(() => Bird)
  bird: Bird

  @Column()
  birdId: ObjectId

  @Field(() => Location)
  location: Location

  @Column()
  locationId: ObjectId

  @Field(() => GeoPoint)
  @Column({ nullable: true, type: 'simple-json' })
  geolocation: Point

  @Field({ nullable: true })
  @Column()
  description?: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
