import { userInfo } from "..";

export type authentication = {
  awaitingAuth: boolean;
  user: userInfo | null;
};

export type action =
  | {
      type: "auth/setUserInfo";
      user: userInfo;
    }
  | {
      type: "auth/refresh" | "auth/stopRefresh";
    };

export type reducer = {
  (state: authentication, action: action): authentication;
};
