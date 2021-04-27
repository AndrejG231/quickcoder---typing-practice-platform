import { AuthReducer, UserInfoReducer } from "../../types/redux/AuthT";

export const refreshAuthReducer: AuthReducer = (
  state = { awaitingAuth: false },
  action
) => {
  switch (action.type) {
    case "auth/refresh":
      return { awaitingAuth: true };
    case "auth/stopRefresh":
      return { awaitingAuth: false };
    default:
      return state;
  }
};

export const setUserInfo: UserInfoReducer = (state = null, action) => {
  switch (action.type) {
    case "auth/setUserInfo":
      return {
        ...action.user,
      };
    default:
      return state;
  }
};
