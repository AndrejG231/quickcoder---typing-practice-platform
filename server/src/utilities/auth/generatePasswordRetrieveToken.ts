import PassTokens from "../../types/entities/PassTokens";
import Users from "../../types/entities/Users";
import { getConnection } from "typeorm";
import add from "date-fns/add";

interface genPassRetrieveToken {
  (user: Users, clientInfo: string): Promise<any>;
}

const generatePasswordRetrieveToken: genPassRetrieveToken = async (
  user,
  clientInfo
) => {
  const expirationTime = add(new Date(), { minutes: 15 });

  const token = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(PassTokens)
    .values({
      user_id: user.id,
      client_info: clientInfo,
      expires_at: expirationTime,
    })
    .execute();

  return token;
};

export default generatePasswordRetrieveToken;
