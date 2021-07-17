import { Request } from "express";
import { Practices } from "../../entities";
import { getConnection } from "typeorm";
import { generateResponse, getUserFromCookie } from "../../utilities";

const createTypingTest = async (req: Request) => {
  let { user, error } = await getUserFromCookie(req);

  if (!user) {
    return { result: error! };
  }
  //signed User
  const practice = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Practices)
    .values({
      user_id: user.id,
      category: "test",
      index: 0,
      practice_index: -1,
      string: "Test", // Get test string
    })
    .returning("*")
    .execute();

  return {
    result: generateResponse(true, "getPracticesObject_practice_created"),
    practice: practice.generatedMaps[0],
  };
};

export default createTypingTest;
