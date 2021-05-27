import { Field, Float, Int, ObjectType } from "type-graphql";
import ActionResponse from "./actionResponse";

@ObjectType()
export class PracticeStat {
  @Field(() => Int, { nullable: true })
  score: number;

  @Field(() => Float, { nullable: true })
  error_rate: number;

  @Field(() => Int, { nullable: true })
  cpm: number;

  @Field(() => Int, { nullable: true })
  length: number;

  @Field({ nullable: true })
  category: string;

  @Field(() => Int, { nullable: true })
  practice_index: number;

  @Field(() => Int, { nullable: true })
  user_name: string;
}

@ObjectType()
class PracticeStatsResponse {
  @Field(() => ActionResponse)
  response: ActionResponse;

  @Field(() => [PracticeStat], { nullable: true })
  stats?: PracticeStat[];
}

export default PracticeStatsResponse;
