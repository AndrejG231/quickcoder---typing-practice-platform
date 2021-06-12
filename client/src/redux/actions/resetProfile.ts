import { action } from "../../types/types_redux/profileT";

const resetProfile = (fields: "overview" | "history" | "all"): action => {
  switch (fields) {
    case "overview":
      return {
        type: "profile/resetOverview",
      };
    case "history":
      return {
        type: "profile/resetHistory",
      };
    case "all":
      return {
        type: "profile/resetAll",
      };
  }
};

export default resetProfile;
