import Practices from "../../entities/Practices";
import { getConnection } from "typeorm";

interface userPlayLength {
  (userId: number, practiceName: string): Promise<number>;
}

const getUserPlayLength: userPlayLength = async (userId, practiceName) => {
  const playLength = await getConnection()
    .createQueryBuilder()
    .select("sum(index)")
    .from(Practices, "practice")
    .where("user_id = :user_id AND practice_name = :practice_name", {
      user_id: userId,
      practice_name: practiceName,
    })
    .execute();

  return playLength[0].sum;
};

export default getUserPlayLength;
