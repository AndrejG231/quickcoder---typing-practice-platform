import { action } from "../../types/types_redux/profileT";
import { userPracticeHistory } from "../../types";

const setProfileHistory = (
  history: userPracticeHistory,
  type: "update" | "load"
): action => {
  return {
    type: type === "update" ? "profile/updateHistory" : "profile/loadHistory",
    history,
  };
};

export default setProfileHistory;
