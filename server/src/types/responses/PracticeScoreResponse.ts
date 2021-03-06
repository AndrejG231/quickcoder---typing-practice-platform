import { Field, Int, ObjectType } from "type-graphql";
import ActionResponse from "./ActionResponse";

@ObjectType()
class PracticeStatsResponse {
  @Field(() => Int, { nullable: true })
  score?: number;

  @Field(() => Int, { nullable: true })
  length?: number;

  @Field(() => ActionResponse)
  response: ActionResponse;
}

export default PracticeStatsResponse;
