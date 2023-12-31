import { ObjectType, Field } from '@nestjs/graphql'
import { GraphQLObjectID } from 'graphql-scalars'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => GraphQLObjectID)
  id: string

  @Column()
  @Field()
  uid: string

  @Column()
  @Field()
  locale?: string

  @Column({ default: Role.USER })
  @Field(() => String)
  role: Role

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date
}
