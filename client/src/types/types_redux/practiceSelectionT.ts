import { practiceItem } from "../";

export type practiceSelection = {
  selectedPractice: practiceItem | null;
  selectedCategory: number;
  lengthIndex: number;
  length: number;
  error: boolean;
  loading: boolean;
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
    }
  | {
      type: "practiceSelect/setLoading";
      toggle: boolean;
    }
  | {
      type: "practiceSelect/setErrors";
      toggle: boolean;
    };

export type reducer = {
  (state: practiceSelection, action: action): practiceSelection;
};
