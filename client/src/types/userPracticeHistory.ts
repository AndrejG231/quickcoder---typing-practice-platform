import { practiceInfo } from ".";

type userPracticeHistory = {
  totalCount: number;
  history: (practiceInfo & { created_at: Date; id: number })[];
};

export default userPracticeHistory;
