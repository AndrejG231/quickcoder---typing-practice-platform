const calculatePracticeScore = (
  index: number,
  errors_count: number,
  timeSpent: number
) => {
  const cpm = index / (timeSpent / 60000);
  const errorRate = (errors_count / index) * 100;

  const errQ = (1 / 26) * (26 - errorRate);
  const cpmQ = (1 / 300) * (cpm - 50);

  return {
    score: Math.round(Math.max(1000 * errQ * cpmQ, 0)),
    cpm: Math.round(cpm),
    errors_rate: errorRate,
  };
};

export default calculatePracticeScore;
