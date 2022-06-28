import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreateStudentInput {
  @Field(() => String) name: string;
  @Field(() => Date) dob: Date;
  @Field(() => String) email: string;
}