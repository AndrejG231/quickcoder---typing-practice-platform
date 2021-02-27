import { Characters } from "./KeyBoardT";

export type Errors = {
  [index: string]: string;
};

export type PracticeObjectT = {
  index: number;
  string: string;
  id: number;
  lastError: Characters;
  errors: Errors;
  errorsCount: number;
  isActive: boolean;
  isFinished: boolean;
  startTime: number;
};
