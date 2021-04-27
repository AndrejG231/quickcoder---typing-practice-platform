export type practiceSelection = {
  selectedName: string;
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
      selected: string;
    };

export type reducer = {
  (state: practiceSelection, action: action): practiceSelection;
};
