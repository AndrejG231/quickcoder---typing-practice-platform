const calculatePracticeScore = (
  index: number,
  errorRate: number,
  timeSpent: number
): number => {
  const cpm = index / (timeSpent / 60000);

  const errQ = (1 / 26) * (26 - errorRate);
  const cpmQ = (1 / 300) * (cpm - 50);

  return Math.round(Math.max(1000 * errQ * cpmQ, 0)) || 0;
};

export default calculatePracticeScore;
