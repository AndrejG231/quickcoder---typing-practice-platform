import { action } from "../../types/types_redux/globalMessageT";

const setGlobalMessage = (message: string): action => {
  return {
    type: "message/set",
    message: message,
  };
};

export default setGlobalMessage;
