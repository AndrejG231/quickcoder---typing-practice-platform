import { Field, ObjectType } from "type-graphql";

@ObjectType()
class ErrorReturn {
  @Field()
  at: string;
  @Field()
  info: string;
  @Field()
  message: string;
}

export default ErrorReturn;