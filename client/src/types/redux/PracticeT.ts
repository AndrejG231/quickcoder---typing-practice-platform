import { Errors } from "../practice/PracticeT";
import { Characters } from "../practice/KeyBoardT";

export type PracticeObjectT = {
  index: number;
  lastError: string;
  string: string;
  id: number;
  errors: Errors;
  errorsCount: number;
  isActive: boolean;
  isFinished: boolean;
};

export const PracticeObject: PracticeObjectT = {
  index: 0,
  string: "",
  lastError: "",
  id: -1,
  errors: {},
  errorsCount: 0,
  isActive: false,
  isFinished: false,
};

type PracticeSetObject = {
  type: "practice/set";
  practice: PracticeObjectT;
};
export type PracticeSetActionT = {
  (practice: PracticeObjectT): PracticeSetObject;
};

export type HandleProgressFunctionT = {
  (character: Characters, state: PracticeObjectT): PracticeObjectT;
};

type PracticeResetObject = {
  type: "practice/reset";
};

export type PracticeResetAction = {
  (): PracticeResetObject;
};

export type PracticeReducerT = {
  (
    state: PracticeObjectT,
    action: PracticeSetObject | PracticeResetObject
  ): PracticeObjectT;
};

//practice animations
export type PracticeAnimationActoinObject = {
  type: "animate" | "errorSkip" | "reset";
};

export type PracticeAnimationReducerT = {
  (state: number, action: PracticeAnimationActoinObject): number;
};
