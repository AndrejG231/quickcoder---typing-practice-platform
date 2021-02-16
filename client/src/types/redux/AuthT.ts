import { UserInfo } from "../graphql/AuthMutationsT";

export interface SetAuthAction {
  type: "auth/login" | "auth/logout";
}

interface UserInfoAction {
  type: "auth/setUserInfo";
  user: UserInfo;
}

export interface getUserInfoAction {
  (user: UserInfo): UserInfoAction;
}

export interface AuthReducerState {
  isAuth: boolean;
}

export interface AuthReducer {
  (state: AuthReducerState, action: SetAuthAction): AuthReducerState;
}

export interface UserInfoReducer {
  (state: UserInfo, action: UserInfoAction): UserInfo;
}
