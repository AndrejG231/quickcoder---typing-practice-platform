import { ObjectType, Field, Int, Float } from "type-graphql";

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

  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  created_at: Date;
}

export default PracticeStat;
