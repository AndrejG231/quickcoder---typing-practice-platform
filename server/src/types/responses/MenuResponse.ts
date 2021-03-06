import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Menu {
  @Field()
  type: string;

  @Field({ nullable: true })
  category?: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  overview?: string;
}

@ObjectType()
class MenuResponse {
  @Field({ nullable: true })
  hasMore?: boolean;

  @Field(() => Menu, { nullable: true })
  item?: Menu;

  @Field({ nullable: true })
  error?: string;
}

export default MenuResponse
