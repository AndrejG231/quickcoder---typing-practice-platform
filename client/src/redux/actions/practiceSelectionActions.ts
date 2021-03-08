import {
  practiceLengthActionT,
  practiceSelectActionT,
} from "../../types/redux/PracticeSelectionT";

export const practiceSwitchLen: practiceLengthActionT = (len) => {
  return {
    type: "practiceSelect/setlen",
    len: len,
  };
};

export const practiceSetSelected: practiceSelectActionT = (selected) => {
  return {
    type: "practiceSelect/setselect",
    selected: selected,
  };
};
