import GraphqlContext from "../types/GraphqlContext";
import getUserFromCookie from "../utilities/auth/getUserFromCookie";
import {
  Arg,
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import MenuArray from "../utilities/practices/generateMenu";

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

@Resolver()
class MenuResolver {
  @Query(() => MenuResponse)
  async getItem(
    @Arg("index", () => Int) index: number,
    @Ctx() { req }: GraphqlContext
  ) {
    if (index >= MenuArray.length) {
      return {
        error: "Invalid Index",
      };
    }

    const userData = await getUserFromCookie(req, "en");

    if (!userData.user || MenuArray[index].type === "category") {
      return {
        hasMore: index + 1 < MenuArray.length,
        item: MenuArray[index],
      };
    }

    return {
      hasMore: index + 1 < MenuArray.length,
      item: {
        ...MenuArray[index],
      },
    };
  }
}

export default MenuResolver;
