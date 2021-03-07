import { Field, Int, ObjectType } from "type-graphql";
import ActionResponse from "./ActionResponse";

@ObjectType()
export class PracticeStat {
  @Field(() => Int, { nullable: true })
  score: number;

  @Field(() => Int, { nullable: true })
  length: number;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
class PracticeStatsResponse {
  @Field(() => ActionResponse)
  response: ActionResponse;

  @Field(() => [PracticeStat], { nullable: true })
  stats?: PracticeStat[];
}

export default PracticeStatsResponse;
