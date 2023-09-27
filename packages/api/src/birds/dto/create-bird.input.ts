import { InputType, Field } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

@InputType()
export class CreateBirdInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string

  @IsString()
  @Field()
  fullname: string

  @IsString()
  @Field()
  category: string

  @IsUrl()
  @Field()
  url: string

  @IsInt()
  @Field({ defaultValue: 0 }) //<- default value when not provided
  observations: number

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string
}
