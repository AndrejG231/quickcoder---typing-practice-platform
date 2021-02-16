import {AnimationState} from "../../types/redux/AnimationT";

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
