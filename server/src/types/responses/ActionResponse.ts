import { Field, ObjectType } from "type-graphql";

@ObjectType()
class ActionResponse{
  @Field()
  success: boolean;
  @Field()
  action: string;
  @Field()
  info: string;
  @Field()
  message: string;
}

export default ActionResponse;