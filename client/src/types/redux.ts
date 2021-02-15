import { UserInfo } from "./auth";
//--actions

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

interface globalMessage {
  message: string;
}

interface globalMessageAction {
  message: string;
  type: "message/set";
}

export interface setGlobalMessageAction {
  (message: string): globalMessageAction;
}
//--reducers

interface AuthReducerState {
  isAuth: boolean;
}

export interface AuthReducer {
  (state: AuthReducerState, action: SetAuthAction): AuthReducerState;
}

export interface UserInfoReducer {
  (state: UserInfo, action: UserInfoAction): UserInfo;
}

export interface GlobalMessageReducer {
  (state: globalMessage, action: globalMessageAction): globalMessage;
}

//Main

export type ReduxState = {
  UserInfo: UserInfo;
  isAuth: AuthReducerState;
  globalMessage: globalMessage;
};
