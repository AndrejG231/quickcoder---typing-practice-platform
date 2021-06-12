import { practiceInfo } from ".";

type userPracticeHistory = {
  totalCount: number;
  lastPractices: (practiceInfo & { created_at: Date; id: number })[];
};

export default userPracticeHistory;
