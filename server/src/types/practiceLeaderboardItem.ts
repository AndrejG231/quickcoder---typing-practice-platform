import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
class practiceLeaderboardResponse {
  @Field({ nullable: true })
  username?: string;

  @Field(() => Int, { nullable: true })
  score?: number;

  @Field(() => Int, { nullable: true })
  cpm?: number;

  @Field(() => Float, { nullable: true })
  errors_rate?: number;

  @Field(() => Int, { nullable: true })
  index?: number;
}

export default practiceLeaderboardResponse;
