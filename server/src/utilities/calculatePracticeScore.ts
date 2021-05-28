interface calcPracticeScore {
  (stats: { index: number; time_spent: number; errors_count: number }): {
    score: number;
    cpm: number;
    errors_rate: number;
  };
}

/*
1000p ... 1%err 
0p ... 25%err


///

1000p ... 350cpm
0p ... 50cpm

 */

const calculatePracticeScore: calcPracticeScore = (stats) => {
  const cpm = stats.index / (stats.time_spent / 60000);
  const errRate = (stats.errors_count / stats.index) * 100;

  const errQ = (1 / 26) * (26 - errRate);
  const cpmQ = (1 / 300) * (cpm - 50);

  return {
    score: Math.round(Math.max(1000 * errQ * cpmQ, 0)),
    cpm: Math.round(cpm),
    errors_rate: errRate,
  };
};

export default calculatePracticeScore;
