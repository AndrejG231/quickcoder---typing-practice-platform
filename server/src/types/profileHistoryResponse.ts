import { ObjectType, Field, Int } from "type-graphql";
import { PracticeStat, ActionResponse } from ".";

@ObjectType()
class ProfileHistoryResponse {
  @Field(() => [PracticeStat], { nullable: true })
  lastPractices?: PracticeStat[];

  @Field(() => Int, { nullable: true })
  totalCount?: number;

  @Field(() => ActionResponse)
  result: ActionResponse;
}

export default ProfileHistoryResponse;
