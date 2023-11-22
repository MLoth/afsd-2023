import { InputType, Field } from '@nestjs/graphql'
import { GraphQLLocale } from 'graphql-scalars'

@InputType()
export class CreateUserInput {
  @Field(() => GraphQLLocale, {
    description: 'Optional locale of the current user.',
  })
  locale?: string
}
