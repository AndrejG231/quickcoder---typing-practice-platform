import { setGlobalMessageAction } from "../../types/redux/GlobalMessageT";

export const setGlobalMessage: setGlobalMessageAction = (message) => {
  return {
    type: "message/set",
    message: message,
  };
};
