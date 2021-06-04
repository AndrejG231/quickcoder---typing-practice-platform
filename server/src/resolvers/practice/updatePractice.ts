import { Practices } from "../../entities";
import { calculatePracticeScore, generateResponse } from "../../utilities";
import { getConnection } from "typeorm";
import { PracticeUpdateFields } from "../../types/";

const updatePractice = async (
  practiceId: number,
  practiceUpdateFields: PracticeUpdateFields
) => {
  try {
    let isFinished = false;
    let stats = { score: 0, cpm: 0, errors_rate: 0 };

    const { index, time_spent } = practiceUpdateFields;
    const errors_count = JSON.parse(practiceUpdateFields.errors || "{}");

    const practice: Practices[] = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Practices, "practice")
      .where("id=:id", { id: practiceId })
      .execute();

    console.log("typecheck\n");
    console.log(index, practice[0].string.length);
    console.log(typeof errors_count, " object");
    console.log(typeof time_spent, " number");

    if (
      index === practice[0].string.length &&
      typeof errors_count === "object" &&
      typeof time_spent === "number"
    ) {
      isFinished = true;
      stats = calculatePracticeScore({
        index,
        errors_count: Object.keys(errors_count).length,
        time_spent,
      });
    }

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
