import { InputType, Int, Field } from '@nestjs/graphql'

@InputType() // graphql
export class CreateBirdInput {
  @Field() //graphql
  name: string

  @Field() //graphql
  fullname: string

  @Field() //graphql
  category: string

  @Field() //graphql
  url: string

  @Field({ defaultValue: 0 }) //graphql
  observations: number

  @Field({ nullable: true }) //graphql
  description?: string
}
