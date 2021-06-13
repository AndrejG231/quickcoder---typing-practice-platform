import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

import {
  ActionResponse,
  PracticeInfoResponse,
  MenuResponse,
  GraphqlContext,
  PracticeUpdateFields,
} from "../../types/";

import { menu } from "../../utilities/";

import createPractice from "./createPractice";
import updatePractice from "./updatePractice";
import deletePractice from "./deletePractice";
import getPractice from "./getPractice";

@Resolver()
class PracticeResolver {
  @Mutation(() => PracticeInfoResponse)
  async createPractice(
    @Arg("category", () => String) category: string,
    @Arg("index", () => Int) index: number,
    @Arg("length", () => Int) length: number,
    @Ctx() { req, res }: GraphqlContext
  ) {
    return await createPractice(category, index, length, req, res);
  }
  @Mutation(() => ActionResponse)
  async updatePractice(
    @Arg("practiceId", () => Int) practiceId: number,
    @Arg("practiceUpdateFields", () => PracticeUpdateFields)
    practiceUpdateFields: PracticeUpdateFields
  ) {
    return await updatePractice(practiceId, practiceUpdateFields);
  }
  @Mutation(() => ActionResponse)
  async deletePractice(
    @Arg("practiceId", () => Int) practiceId: number,
    @Ctx() { req }: GraphqlContext
  ) {
    return await deletePractice(req, practiceId);
  }
  @Query(() => PracticeInfoResponse)
  async getPractice(@Arg("id", () => Int) id: number) {
    return await getPractice(id);
  }
  @Query(() => [MenuResponse])
  async getMenu() {
    return menu;
  }
}

export default PracticeResolver;
