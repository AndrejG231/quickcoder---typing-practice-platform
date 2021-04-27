import { reducer } from "../../types/types_redux/globalMessageT";

const defaultState = {
  message: "",
};

const globalMessage: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "message/set":
      return {
        message: action.message,
      };
    default:
      return state;
  }
};

export default globalMessage;
