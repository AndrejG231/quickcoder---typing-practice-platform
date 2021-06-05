import { userProfileOverview } from "../../types";
import { action } from "../../types/types_redux/profileT";

const setProfileOverview = (overview: userProfileOverview): action => {
  return {
    type: "profile/setOverview",
    overview: overview,
  };
};

export default setProfileOverview;
