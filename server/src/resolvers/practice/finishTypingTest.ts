import { Practices } from "../../entities";
import { calculatePracticeScore, generateResponse } from "../../utilities";
import { getConnection } from "typeorm";
import { PracticeUpdateFields } from "../../types/";

const finishTypingTest = async (
  practiceId: number,
  practiceUpdateFields: PracticeUpdateFields
) => {
  try {
    //   Updating practice
    let isFinished = false;
    let stats = { score: 0, cpm: 0, errors_rate: 0 };

    const { index, time_spent } = practiceUpdateFields;
    const errors = JSON.parse(practiceUpdateFields.errors || "{}");

    const practice: Practices[] = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Practices, "practice")
      .where("id=:id", { id: practiceId })
      .execute();

    if (
      index === practice[0].string.length &&
      typeof errors === "object" &&
      typeof time_spent === "number"
    ) {
      isFinished = true;
      stats = calculatePracticeScore({
        index,
        errors_count: Object.keys(errors).length,
        time_spent,
      });
    }

    await getConnection()
      .createQueryBuilder()
      .update(Practices)
      .set({ ...practiceUpdateFields, ...stats, is_finished: isFinished })
      .where("id = :id", { id: practiceId })
      .execute();

    const [{ lesser }] = await getConnection()
      .createQueryBuilder()
      .select("COUNT(*) as lesser")
      .from(Practices, "practices")
      .where("score < :score", { score: stats.score })
      .execute();

    const [{ count }] = await getConnection()
      .createQueryBuilder()
      .select("COUNT(*) as count")
      .from(Practices, "practices")
      .execute();

    return {
      result: generateResponse(true, "updatePracticeObject_practice_updated"),
      stats: {
        score: stats.score,
        cpm: stats.cpm,
        errorRate: stats.errors_rate,
        timeSpent: time_spent,
        betterThan: lesser / count,
        errors: Object.keys(errors).length,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      result: generateResponse(false, "updatePracticeObject_practice_failed"),
    };
  }
};

export default finishTypingTest;
