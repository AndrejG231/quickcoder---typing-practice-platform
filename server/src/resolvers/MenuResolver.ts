import GraphqlContext from "../types/GraphqlContext";
import getUserFromCookie from "../utilities/auth/getUserFromCookie";
import calculatePracticeScore from "../utilities/calculatePracticeScore";
import getRecentPracticeStats from "../utilities/practices/getRecentPractices";
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
import getUserPlayLength from "../utilities/practices/getUserPlayLength";

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

  @Field(() => Int, { nullable: true })
  userScore?: number;

  @Field(() => Int, { nullable: true })
  userPlayLength?: number;
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

    const recentPractice = await getRecentPracticeStats(
      userData.user.id,
      MenuArray[index].category + "+" + MenuArray[index].name
    );

    const userScore = calculatePracticeScore(recentPractice);
    const userPlayLength = getUserPlayLength(
      userData.user.id,
      MenuArray[index].category + "+" + MenuArray[index].name
    );

    return {
      hasMore: index + 1 < MenuArray.length,
      item: {
        ...MenuArray[index],
        userScore: userScore > 0 ? userScore : 0,
        userPlayLength: userPlayLength,
      },
    };
  }
}

export default MenuResolver;
