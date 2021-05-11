import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

import {
  actionResponse,
  practiceInfoResponse,
  menuResponse,
} from "../../types/responses";
import { practiceUpdateFields } from "../../types/arguments";
import { graphqlContext } from "../../types";

import { menu } from "../../utilities/";

import createPractice from "./createPractice";
import updatePractice from "./updatePractice";
import deletePractice from "./deletePractice";
import getPractice from "./getPractice";

@Resolver()
class PracticeResolver {
  @Mutation(() => practiceInfoResponse)
  async createPractice(
    @Arg("category", () => String) category: string,
    @Arg("index", () => Int) index: number,
    @Arg("length", () => Int) length: number,
    @Ctx() { req, res }: graphqlContext
  ) {
    return await createPractice(category, index, length, req, res);
  }
  @Mutation(() => actionResponse)
  async updatePractice(
    @Arg("practiceId", () => Int) practiceId: number,
    @Arg("practiceUpdateFields", () => practiceUpdateFields)
    practiceUpdateFields: practiceUpdateFields
  ) {
    return await updatePractice(practiceId, practiceUpdateFields);
  }
  @Mutation(() => actionResponse)
  async deletePractice(@Arg("practiceId", () => Int) practiceId: number) {
    return await deletePractice(practiceId);
  }
  @Query(() => practiceInfoResponse)
  async getPractice(@Arg("id", () => Int) id: number) {
    return await getPractice(id);
  }
  @Query(() => [menuResponse])
  async getMenu() {
    return menu;
  }
}

export default PracticeResolver;
