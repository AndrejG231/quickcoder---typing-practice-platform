import {UserInfo} from "./auth";
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

//Main

export type ReduxState = {
  UserInfo: UserInfo;
  isAuth: AuthReducerState;
};
