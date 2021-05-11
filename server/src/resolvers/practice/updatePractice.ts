import { Practices } from "src/entities";
import { generateResponse } from "src/utilities";
import { getConnection } from "typeorm";
import { practiceUpdateFields } from "../../types/arguments";

const updatePractice = async (
  practiceId: number,
  practiceUpdateFields: practiceUpdateFields
) => {
  try {
    await getConnection()
      .createQueryBuilder()
      .update(Practices)
      .set(practiceUpdateFields)
      .where("id = :id", { id: practiceId })
      .execute();

    return generateResponse(true, "updatePracticeObject_practice_updated");
  } catch (err) {
    console.log(err);
    return generateResponse(false, "updatePracticeObject_practice_failed");
  }
};

export default updatePractice;
