import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  // @Directive('@external')
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Date)
  dob: Date;

  @Column()
  @Field(() => String)
  email: string;
}
