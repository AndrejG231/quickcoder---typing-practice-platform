import { userPracticeHistory, userProfileOverview } from "../";

export type profile = {
  overview: userProfileOverview | null;
  history: userPracticeHistory | null;
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
    };

export type reducer = {
  (state: profile, action: action): profile;
};
