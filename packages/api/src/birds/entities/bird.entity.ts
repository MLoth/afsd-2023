import { ObjectType, Field, Int, ID } from '@nestjs/graphql'

@ObjectType()
export class Bird {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  fullname: string

  @Field()
  category: string
}
