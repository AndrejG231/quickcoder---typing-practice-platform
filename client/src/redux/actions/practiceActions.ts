import {
  PracticeSetActionT,
  PracticeAnimationActoinObject,
  PracticeResetAction,
} from "../../types/redux/PracticeT";

export const setPracticeAction: PracticeSetActionT = (practice) => {
  return {
    practice: practice,
    type: "practice/set",
  };
};


export const resetPracticeSession: PracticeResetAction = () => {
  return {
    type: "practice/reset",
  };
};

export const animatePracticeOffset: {
  (): PracticeAnimationActoinObject;
} = () => {
  return {
    type: "animate",
  };
};

export const skipPracticeOffset: { (): PracticeAnimationActoinObject } = () => {
  return {
    type: "errorSkip",
  };
};

export const resetPracticeOffset: {
  (): PracticeAnimationActoinObject;
} = () => {
  return {
    type: "reset",
  };
};
