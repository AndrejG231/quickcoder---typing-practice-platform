import { Field, Int, ObjectType } from "type-graphql";
import ActionResponse from "./ActionResponse";

@ObjectType()
class PracticeScoreResponse {
  @Field(() => Int, { nullable: true })
  score?: number;

  @Field(() => ActionResponse)
  response: ActionResponse;
}

export default PracticeScoreResponse;
