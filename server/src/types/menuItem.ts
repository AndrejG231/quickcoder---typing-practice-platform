import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
class MenuItem {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  overview: string;

  @Field(() => Int)
  index: number;
}

export default MenuItem;
