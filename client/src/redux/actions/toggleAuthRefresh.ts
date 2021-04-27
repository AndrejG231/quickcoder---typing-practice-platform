import { action } from "../../types/types_redux/authenticationT";

const toggleAuthRefresh = (refresh: boolean): action => {
  return {
    type: refresh ? "auth/refresh" : "auth/stopRefresh",
  };
};

export default toggleAuthRefresh;
