import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
class AverageUserStats {
  @Field(() => Int)
  averageScore: number;

  @Field(() => Int)
  averageCpm: number;

  @Field(() => Float)
  averageErrorsRate: number;

  @Field(() => Int)
  totalLength: number;

  @Field(() => Int)
  finishedTimeSpent: number;
}
export default AverageUserStats;
