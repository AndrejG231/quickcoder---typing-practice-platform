import { Request } from "express";
import { Practices } from "../../entities";
import { getUserFromCookie } from "../../utilities";
import { getConnection } from "typeorm";

const getUnfinishedCount = async (req: Request): Promise<number> => {
  const { user } = await getUserFromCookie(req);

  if (!user) {
    return 0;
  }

  const [{ count }] = await getConnection()
    .createQueryBuilder()
    .select("COUNT(*) as count")
    .from(Practices, "practices")
    .where("user_id = :user_id AND is_finished = :is_finished AND category != 'test'", {
      user_id: user.id,
      is_finished: false,
    })
    .execute();

  return count;
};

export default getUnfinishedCount;
