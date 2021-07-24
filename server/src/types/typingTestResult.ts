import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class TypingTestResult {
  @Field(() => Int)
  score: number;

  @Field(() => Int)
  cpm: number;

  @Field(() => Float)
  errorRate: number;

  @Field(() => Int)
  timeSpent: number;

  @Field(() => Float)
  betterThan: number;

  @Field(() => Int)
  errors: number;
}

export default TypingTestResult;
