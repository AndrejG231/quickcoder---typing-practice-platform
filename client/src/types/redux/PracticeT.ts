import { Errors } from "../practice/PracticeT";
import { Characters } from "../practice/KeyBoardT";

export type PracticeObjectT = {
  index: number;
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

type PracticeProgressObject = {
  type: "practice/progress";
  character: Characters;
};

export type PracticeProgressActionT = {
  (keyPressed: Characters): PracticeProgressObject;
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
    action: PracticeProgressObject | PracticeSetObject | PracticeResetObject
  ): PracticeObjectT;
};

//practice animations
export type PracticeAnimationActoinObject = {
  type: "animate" | "errorSkip" | "reset";
};

export type PracticeAnimationReducerT = {
  (state: number, action: PracticeAnimationActoinObject): number;
};
