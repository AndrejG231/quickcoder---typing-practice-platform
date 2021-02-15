import {
  SetAuthAction,
  getUserInfoAction,
  setGlobalMessageAction,
} from "../types/redux";

export const loginAction: SetAuthAction = {
  type: "auth/login",
};

export const logoutAction: SetAuthAction = {
  type: "auth/logout",
};

export const setUserInfoAction: getUserInfoAction = (user) => {
  return {
    type: "auth/setUserInfo",
    user: user,
  };
};

export const setGlobalMessage: setGlobalMessageAction = (message) => {
  return {
    type: "message/set",
    message: message,
  };
};
