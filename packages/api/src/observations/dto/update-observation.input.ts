import { CreateObservationInput } from './create-observation.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
//toDo
@InputType()
export class UpdateObservationInput extends PartialType(
  CreateObservationInput,
) {
  @Field(() => Int)
  id: number
}
