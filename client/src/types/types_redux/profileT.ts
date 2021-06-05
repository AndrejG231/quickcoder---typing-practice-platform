import { userProfileOverview } from "../";

export type profile = {
  overview: userProfileOverview | null;
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
    };

export type reducer = {
  (state: profile, action: action): profile;
};
