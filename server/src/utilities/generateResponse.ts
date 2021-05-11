import messages from "../data/messages";
import { actionResponse } from "../types/responses/";

const generateResponse = (success: boolean, key: string): actionResponse => {
  return {
    success: success,
    info: key,
    message: messages[key],
  };
};

export default generateResponse;
