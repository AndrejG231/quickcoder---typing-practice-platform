import { PassTokens, Users } from "../entities/";
import { getConnection, InsertResult } from "typeorm";
import add from "date-fns/add";

interface genPassRetrieveToken {
  (user: Users): Promise<InsertResult>;
}

const generatePasswordRetrieveToken: genPassRetrieveToken = async (user) => {
  const expirationTime = add(new Date(), { minutes: 15 });

  const token = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(PassTokens)
    .values({
      user_id: user.id,
      expires_at: expirationTime,
    })
    .execute();

  return token;
};

export default generatePasswordRetrieveToken;
