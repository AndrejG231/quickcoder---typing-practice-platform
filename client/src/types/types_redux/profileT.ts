import {
  unfinishedPractice,
  userPracticeHistory,
  userProfileOverview,
} from "../";

export type profile = {
  overview: userProfileOverview | null;
  history: userPracticeHistory | null;
  unfinished: unfinishedPractice[];
  unfinishedCount: number;
  awaitingHistoryUpdate: boolean;
};

export type action =
  | {
      type: "profile/setOverview";
      overview: userProfileOverview;
    }
  | {
      type: "profile/resetOverview";
    }
  | {
      type: "profile/resetAll";
    }
  | {
      type: "profile/loadHistory";
      history: userPracticeHistory;
    }
  | {
      type: "profile/updateHistory";
      history: userPracticeHistory;
    }
  | {
      type: "profile/resetHistory";
    }
  | {
      type: "profile/toggleHistoryRefresh";
      refresh: boolean;
    }
  | {
      type: "profile/setUnfinished";
      practices: unfinishedPractice[];
    }
  | {
      type: "profile/setUnfinishedCount";
      count: number;
    };

export type reducer = {
  (state: profile, action: action): profile;
};
