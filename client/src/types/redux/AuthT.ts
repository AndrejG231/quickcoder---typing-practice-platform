import { UserInfo } from "../graphql/AuthMutationsT";

export interface refreshAuthActionObject {
  type: "auth/refresh";
}

export interface refreshAuthActionT {
  (): refreshAuthActionObject;
}

interface UserInfoAction {
  type: "auth/setUserInfo";
  user: UserInfo;
}

export interface getUserInfoAction {
  (user: UserInfo): UserInfoAction;
}

export interface AuthReducerState {
  AuthCount: number;
}

export interface AuthReducer {
  (state: AuthReducerState, action: refreshAuthActionObject): AuthReducerState;
}

export interface UserInfoReducer {
  (state: UserInfo, action: UserInfoAction): UserInfo;
}
