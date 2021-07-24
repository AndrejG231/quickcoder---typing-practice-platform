import { Field, ObjectType } from "type-graphql";
import { TypingTestResult, ActionResponse } from ".";

@ObjectType()
class FinishTypingTestResponse {
  @Field(() => TypingTestResult)
  stats: TypingTestResult;

  @Field(() => ActionResponse)
  result: ActionResponse;
}

export default FinishTypingTestResponse;
