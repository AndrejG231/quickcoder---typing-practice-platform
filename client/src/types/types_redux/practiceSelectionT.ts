import { practiceItem } from "../";

export type practiceSelection = {
  selectedPractice: practiceItem | null;
  lengthIndex: number;
  length: number;
};

export type action =
  | {
      type: "practiceSelect/setlen";
      len: number;
    }
  | {
      type: "practiceSelect/setselect";
      selected: practiceItem;
    };

export type reducer = {
  (state: practiceSelection, action: action): practiceSelection;
};
