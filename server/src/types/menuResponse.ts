import { ObjectType, Field, Int } from "type-graphql";
import { MenuItem } from "./";

@ObjectType()
class MenuResponse {
  @Field()
  category: string;

  @Field()
  description: string;

  @Field(() => [MenuItem])
  items: [MenuItem];
}

export default MenuResponse;
