import GraphqlContext from "../types/GraphqlContext";
import getUserFromCookie from "../utilities/auth/getUserFromCookie";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import MenuArray from "../utilities/practices/generateMenu";
import MenuResponse from "../types/responses/MenuResponse";

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
