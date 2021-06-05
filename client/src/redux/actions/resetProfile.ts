import { action } from "../../types/types_redux/profileT";

const resetProfile = (fields: "overview" | "all"): action => {
  switch (fields) {
    case "overview":
      return {
        type: "profile/resetOverview",
      };
    case "all":
      return {
        type: "profile/resetAll",
      };
  }
};

export default resetProfile;
