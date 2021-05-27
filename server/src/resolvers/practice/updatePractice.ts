import { Practices } from "../../entities";
import { calculatePracticeScore, generateResponse } from "../../utilities";
import { getConnection } from "typeorm";
import { practiceUpdateFields } from "../../types/arguments";

const updatePractice = async (
  practiceId: number,
  practiceUpdateFields: practiceUpdateFields
) => {
  try {
    let isFinished = false;
    let stats = { score: 0, cpm: 0, errors_rate: 0 };

    const practice: Practices[] = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Practices, "practice")
      .where("id=:id", { id: practiceId })
      .execute();

      console.log(practice);

    if (practiceUpdateFields.index === practice[0].string.length ) {
      isFinished = true;
      stats = calculatePracticeScore({
        index: practiceUpdateFields.index,
        errors: practiceUpdateFields.errors || "",
        time_spent: practiceUpdateFields.time_spent || 0,
      });
    }

    console.log(practiceUpdateFields.index, practice[0].string.length);
    console.log("STATS:  ____", stats);

    await getConnection()
      .createQueryBuilder()
      .update(Practices)
      .set({ ...practiceUpdateFields, ...stats, is_finished: isFinished })
      .where("id = :id", { id: practiceId })
      .execute();

    return generateResponse(true, "updatePracticeObject_practice_updated");
  } catch (err) {
    console.log(err);
    return generateResponse(false, "updatePracticeObject_practice_failed");
  }
};

export default updatePractice;
