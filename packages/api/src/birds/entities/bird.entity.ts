import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType({ description: 'bird' })
export class Bird {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  fullname: string

  @Column()
  @Field()
  category: string

  @Column()
  @Field()
  url: string

  @Column()
  @Field()
  observations: number

  @Column()
  @Field({ nullable: true }) // <- nullable: true, because we want to return null if the bird has no description
  description?: string

  @Column()
  @Field({ nullable: true })
  active?: boolean

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date
}
