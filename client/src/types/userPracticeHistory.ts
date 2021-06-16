import { practiceInfo } from ".";

type userPracticeHistory = {
  lastPractices: (practiceInfo & { created_at: Date; id: number })[];
};

export default userPracticeHistory;
