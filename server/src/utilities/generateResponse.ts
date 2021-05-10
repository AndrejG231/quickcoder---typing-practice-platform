import messages from "../data/messages";
import ActionResponse from "../types/responses/actionResponse";

const generateResponse = (success: boolean, key: string): ActionResponse => {
  return {
    success: success,
    info: key,
    message: messages[key],
  };
};

export default generateResponse;
