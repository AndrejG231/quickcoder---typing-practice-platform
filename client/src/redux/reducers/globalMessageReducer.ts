import { GlobalMessageReducer } from "../../types/redux/GlobalMessageT";

export const setGlobalMessage: GlobalMessageReducer = (
  state = {
    message: "",
  },
  action
) => {
  switch (action.type) {
    case "message/set":
      return {
        message: action.message,
      };
    default:
      return state;
  }
};
