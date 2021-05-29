import { Request } from "express";
import { practiceLeaderboardResponse } from "src/types/responses";
import { getConnection } from "typeorm";
import { Practices } from "../../entities";

import { calculatePracticeScore, getUserFromCookie } from "../../utilities/";

const getPracticeStats = async (
  category: string,
  index: number,
  req: Request
): Promise<practiceLeaderboardResponse> => {
  const userData = await getUserFromCookie(req);

  if (!userData.user) {
    return {
      cpm: 0,
      errors_rate: 0,
      index: 0,
      score: 0,
      username: "none",
    };
  }

  const result = await getConnection()
    .createQueryBuilder()
    .select("index, errors, time_spent")
    .from(Practices, "practices")
    .where(
      `category = :category AND practice_index = :index AND is_finished=:isFinished AND user_id=:userId`,
      { category, index, isFinished: true, userId: userData.user.id }
    )
    .orderBy("created_at", "DESC")
    .limit(21)
    .execute();

  let tempStats = {
    index: 0,
    errors_count: 0,
    time_spent: 0,
  };

  for (const practice of result) {
    tempStats.index += practice.index;
    tempStats.errors_count += Object.keys(JSON.parse(practice.errors)).length;
    tempStats.time_spent += practice.time_spent;
    if (tempStats.index > 2000) {
      break;
    }
  }

  const { score, cpm, errors_rate } = calculatePracticeScore(tempStats);

  const stats = {
    score: score || 0,
    cpm: cpm || 0,
    errors_rate: errors_rate || 0,
    index: tempStats.index,
    username: userData.user.username,
  };

  return stats;
};

export default getPracticeStats;
