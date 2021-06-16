import { action } from "../../types/types_redux/profileT";
import { unfinishedPractice } from "../../types";

const setUnfinishedPractices = (practices: unfinishedPractice[]): action => {
  return {
    type: "profile/setUnfinished",
    practices,
  };
};

export default setUnfinishedPractices;
