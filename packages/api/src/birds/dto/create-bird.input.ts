import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBirdInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
