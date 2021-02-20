import { refreshAuthActionT, getUserInfoAction } from "../../types/redux/AuthT";

export const refreshAuthAction: refreshAuthActionT = () => {
  return {
    type: "auth/refresh",
  };
};

export const setUserInfoAction: getUserInfoAction = (user) => {
  return {
    user: user,
    type: "auth/setUserInfo",
  };
};
