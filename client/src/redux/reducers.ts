import { AnimationState } from "./animations";
import {
  AuthReducer,
  GlobalMessageReducer,
  UserInfoReducer,
} from "../types/redux";

//
/*Auth Reducers */
//

export const isAuth: AuthReducer = (state = { isAuth: false }, action) => {
  switch (action.type) {
    case "auth/login":
      return { isAuth: true };
    case "auth/logout":
      return { isAuth: false };
    default:
      return state;
  }
};

export const setUserInfo: UserInfoReducer = (
  state = {
    id: 0,
    username: "",
    email: "",
    language: "",
    keyboard_layout: "",
    color_scheme: "",
    created_at: "0",
  },

  action
) => {
  switch (action.type) {
    case "auth/setUserInfo":
      return {
        ...state,
        username: action.user.username,
      };
    default:
      return state;
  }
};

//
/* GLOBAL MESSAGES */
//

export const setGlobalMessage: GlobalMessageReducer = (
  state = {
    message: "",
  },
  action
) => {
  switch (action.type) {
    case "message/set":
      return {
        message: action.message,
      };
    default:
      return state;
  }
};

//
/* ANIMATION REDUCER */
//

export const ReduxAnimationHandler = (
  state: any = AnimationState,
  action: any
) => {
  switch (action.type) {
    case "animation/turnOn":
      return {
        ...state,
        [action.target]: {
          ...state[action.target],
          isDisplayed: true,
        },
      };
    case "animation/turnOff":
      return {
        ...state,
        [action.target]: {
          ...state[action.target],
          isDisplayed: false,
        },
      };
    case "animation/animate":
      return {
        ...state,
        [action.target]: {
          ...state[action.target],
          [action.element]: state[action.target][action.element] + action.frame,
        },
      };
    default:
      return state;
  }
};
