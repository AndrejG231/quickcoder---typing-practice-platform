import { Field, Float, Int, ObjectType } from "type-graphql";

import { ActionResponse, PracticeStat } from "./";

@ObjectType()
class PracticeStatsResponse {
  @Field(() => ActionResponse)
  response: ActionResponse;

  @Field(() => [PracticeStat], { nullable: true })
  stats?: PracticeStat[];
}

export default PracticeStatsResponse;
