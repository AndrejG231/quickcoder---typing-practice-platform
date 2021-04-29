import { reducer } from "../../types/types_redux/authenticationT";

const defaultState = { awaitingAuth: true, user: null };

const authentication: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "auth/refresh":
      return { user: state.user, awaitingAuth: true };
    case "auth/stopRefresh":
      return { user: state.user, awaitingAuth: false };
    case "auth/setUserInfo":
      return {
        user: action.user,
        awaitingAuth: state.awaitingAuth,
      };
    default:
      return state;
  }
};

export default authentication;
