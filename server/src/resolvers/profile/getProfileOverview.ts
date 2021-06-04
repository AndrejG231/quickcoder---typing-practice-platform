import { Field, Float, Int, ObjectType } from "type-graphql";



@ObjectType()
class profileOverviewResponse {
  @Field(() => Int)
  averageScore: number;

  @Field(() => Int)
  cpm: number;

  @Field(() => Float)
  errorsRate: number;

  @Field(() => Int)
  totalLength: number;

  @Field(() => Int)
  minutesSpent: number;
}

const getProfileOverview = () => {
  return 1;
};

export default getProfileOverview;
