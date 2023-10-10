import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  // OF NIET?...
  @Field(() => String, { description: 'Example field (placeholder)' })
  uid: string

  @Field(() => String, { description: 'Optional locale of the current user.' })
  locale?: string
}
