import { practiceItem } from "../";

export type practiceSelection = {
  selectedPractice: practiceItem | null;
  selectedCategory: number;
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
    }
  | {
      type: "practiceSelect/selectCategory";
      selected: number;
    };

export type reducer = {
  (state: practiceSelection, action: action): practiceSelection;
};
