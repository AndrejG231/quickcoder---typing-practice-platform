import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class UnfinishedPracticeInfo {
  @Field()
  created_at: Date;

  @Field(() => Int)
  id: number;

  @Field()
  category: string;

  @Field(() => Int)
  practice_index: number;

  @Field(() => Int)
  length: number;

  @Field(() => Int)
  completion: number;
}

export default UnfinishedPracticeInfo;
