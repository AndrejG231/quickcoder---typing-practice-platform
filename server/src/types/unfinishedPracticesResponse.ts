import { Field, ObjectType } from "type-graphql";
import { ActionResponse, UnfinishedPracticeInfo } from "./";

@ObjectType()
class UnfinishedPracticesResponse {
  @Field(() => ActionResponse)
  result: ActionResponse;

  @Field(() => [UnfinishedPracticeInfo], { nullable: true })
  practices?: UnfinishedPracticeInfo[];
}

export default UnfinishedPracticesResponse;
