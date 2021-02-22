import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import MenuArray from "../utilities/practices/generateMenu";

@ObjectType()
export class Menu {
  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  overview?: string;
}

@ObjectType()
class MenuResponse {
  @Field({nullable: true})
  hasMore?: boolean;

  @Field(() => Menu, {nullable: true})
  item?: Menu;

  @Field({nullable: true})
  error?: string;
}

@Resolver()
class MenuResolver {
  @Query(() => MenuResponse)
  async getItem(@Arg("index", () => Int) index: number) {
    if (index >= MenuArray.length) {
      return {
        error: "Invalid Index",
      };
    }
    return {
      hasMore: index + 1 < MenuArray.length,
      item: MenuArray[index],
    };
  }
}

export default MenuResolver;
