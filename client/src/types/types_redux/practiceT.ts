import { practiceObject } from "../";

export type action =
  | {
      type: "practice/set";
      practice: practiceObject;
    }
  | {
      type: "practice/reset";
    };

export type practice = practiceObject | null;

export type reducer = {
  (state: practice, action: action): practice;
};
