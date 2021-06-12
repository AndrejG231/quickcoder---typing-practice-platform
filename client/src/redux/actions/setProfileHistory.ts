import { action } from "../../types/types_redux/profileT";
import { userPracticeHistory } from "../../types";

const setProfileHistory = (
  history: userPracticeHistory,
  type: "update" | "load"
): action => {
  console.log("UPDATING HISTORY");
  console.log(history);
  return {
    type: type === "update" ? "profile/updateHistory" : "profile/loadHistory",
    history,
  };
};

export default setProfileHistory;
