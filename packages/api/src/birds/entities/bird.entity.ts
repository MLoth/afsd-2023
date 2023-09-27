import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity() // Database link - Typeorm
@ObjectType() // Graphql
export class Bird {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID) // Graphql
  id: string

  @Column() // Database link - Typeorm
  @Field() // Graphql
  name: string

  @Column() // Database link - Typeorm
  @Field() // Graphql
  fullname: string

  @Column() // Database link - Typeorm
  @Field() // Graphql
  category: string
}
