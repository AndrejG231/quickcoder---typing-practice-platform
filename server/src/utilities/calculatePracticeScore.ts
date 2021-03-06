import RecentPracticeStats from "src/types/RecentPracticeStats";
import Practices from "../types/entities/Practices";

interface calcPracticeScore {
  (practice: Practices | RecentPracticeStats): number;
}

/*
1000p ... 1%err 
0p ... 25%err


///

1000p ... 350cpm
0p ... 50cpm

 */

const calculatePracticeScore: calcPracticeScore = (practice) => {
  const cpm = practice.index / (practice.time_spent / 60000);
  const errRate = (practice.errors_count / practice.index) * 100;

  const errQ = (1 / 26) * (26 - errRate);
  const cpmQ = (1 / 300) * (cpm - 50);

  return Math.round(Math.max(1000 * errQ * cpmQ, 0));
};

export default calculatePracticeScore;