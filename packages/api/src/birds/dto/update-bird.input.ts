import { CreateBirdInput } from './create-bird.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBirdInput extends PartialType(CreateBirdInput) {
  @Field(() => Int)
  id: number;
}
