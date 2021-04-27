import { action } from "../../types/types_redux/authenticationT";
import { userInfo } from "../../types/";

const setUserInfo = (user: userInfo | null): action => {
  return {
    user: user,
    type: "auth/setUserInfo",
  };
};

export default setUserInfo;
