import { action } from "../../types/types_redux/globalMessageT";

const closeGlobalMessage = (): action => {
  return { type: "message/close" };
};

export default closeGlobalMessage;
