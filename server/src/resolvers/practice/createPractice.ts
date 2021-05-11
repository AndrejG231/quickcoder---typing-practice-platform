import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Practices } from "../../entities";
import {
  validateUserFromCookie,
  generateResponse,
  generatePracticeString,
} from "../../utilities";

const createPractice = async (
  category: string,
  index: number,
  length: number,
  req: Request,
  res: Response
) => {
  let { user } = await validateUserFromCookie(req);

  if (!user) {
    //Not signed it ==> Use Cookies

    const practice = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Practices)
      .values({
        user_id: -1,
        category: category,
        practice_index: index,
        string: generatePracticeString(category, index, length),
        created_at: new Date().getSeconds(),
      })
      .execute();

    res.cookie(`@p${new Date().getTime()}`, practice.generatedMaps[0].id, {
      expires: new Date("Tue, 19 Jan 2038 03:14:07 GMT"),
    });

    return {
      result: generateResponse(true, "getPracticesObject_practice_created"),
      practice: practice.generatedMaps[0],
    };
  }
  //signed User
  const practice = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Practices)
    .values({
      user_id: user.id,
      category: category,
      index: index,
      string: generatePracticeString(category, index, length),
      created_at: new Date().getSeconds(),
    })
    .execute();

  return {
    result: generateResponse(true, "getPracticesObject_practice_created"),
    practice: practice.generatedMaps[0],
  };
};

export default createPractice;
