export type practiceSelectionStateT = {
  selected: string;
  lengthIndex: number;
  length: number;
};

export const practiceSelectionState = {
  selected: "", //practiceName
  lengthIndex: 2, //length of practice
  length: 500,
};

type practiceLengthActionObjectT = {
  type: "practiceSelect/setlen";
  len: number;
};

type practiceSelectActionObjectT = {
  type: "practiceSelect/setselect";
  selected: string;
};

export type practiceLengthActionT = {
  (len: number): practiceLengthActionObjectT;
};

export type practiceSelectActionT = {
  (selected: string): practiceSelectActionObjectT;
};

export type practiceSelectionReducerT = {
  (
    state: practiceSelectionStateT,
    action: practiceSelectActionObjectT | practiceLengthActionObjectT
  ): practiceSelectionStateT;
};
