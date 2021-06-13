import { ObjectType, Field } from "type-graphql";
import { PracticeStat, ActionResponse } from ".";

@ObjectType()
class ProfileHistoryResponse {
  @Field(() => [PracticeStat], { nullable: true })
  lastPractices?: PracticeStat[];

  @Field(() => ActionResponse)
  result: ActionResponse;
}

export default ProfileHistoryResponse;
