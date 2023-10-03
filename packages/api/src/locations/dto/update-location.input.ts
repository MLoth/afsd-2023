import { CreateLocationInput } from './create-location.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

//toDo
@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {
  @Field(() => Int)
  id: number;
}
