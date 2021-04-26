import { userInfo } from "../../types";

export interface refreshAuthActionObject {
  type: "auth/refresh";
}

export interface refreshAuthActionT {
  (): refreshAuthActionObject;
}

interface UserInfoAction {
  type: "auth/setUserInfo";
  user: userInfo;
}

export interface getUserInfoAction {
  (user: userInfo): UserInfoAction;
}

export interface AuthReducerState {
  awaitingAuth: boolean;
}

export interface AuthReducer {
  (state: AuthReducerState, action: refreshAuthActionObject): AuthReducerState;
}

export interface UserInfoReducer {
  (state: userInfo, action: UserInfoAction): userInfo;
}
