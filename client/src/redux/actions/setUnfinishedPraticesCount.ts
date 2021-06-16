import { action } from "../../types/types_redux/profileT";

const setUnfinishedPracticesCount = (count: number): action => {
  return {
    type: "profile/setUnfinishedCount",
    count,
  };
};

export default setUnfinishedPracticesCount;
