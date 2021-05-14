import { reducer } from "../../types/types_redux/globalMessageT";

const defaultState = {
  message: "",
  openTime: 0,
  isClosed: true,
};

const globalMessage: reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "message/set":
      return {
        message: action.message,
        isClosed: false,
        openTime: new Date().getTime(),
      };
    case "message/close":
      return {
        message: state.message,
        isClosed: true,
        openTime: state.openTime,
      };
    default:
      return state;
  }
};

export default globalMessage;
