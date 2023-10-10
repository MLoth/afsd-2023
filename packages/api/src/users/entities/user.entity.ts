import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
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
