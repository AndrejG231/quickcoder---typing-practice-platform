import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { setGlobalMessage, animateIn, animateOut } from "../redux/actions/";
import { PopUp } from "./global_message";
import { reduxStore } from "../types/";

const rdxState = (state: reduxStore) => {
  return {
    message: state.globalMessage.message,
    onScreen: state.animations.message,
  };
};
const rdxDispatch = (dispatch: Dispatch) => {
  return {
    clearMessage: () => dispatch(setGlobalMessage("")),
    closePopUp: () => dispatch(animateOut("message")),
    openPopUp: () => dispatch(animateIn("message")),
  };
};

interface globalMessageProps {
  message: string;
  onScreen: boolean;
  clearMessage: () => void;
  closePopUp: () => void;
  openPopUp: () => void;
}

const GlobalMessage: React.FC<globalMessageProps> = ({
  message,
  clearMessage,
  closePopUp,
  openPopUp,
  onScreen,
}) => {
  const removeMessage = (tempMessage: string) => {
    closePopUp();
    if (tempMessage === message) {
      setTimeout(() => clearMessage(), 400);
    }
  };

  useEffect(() => {
    if (message.length) {
      openPopUp();
    }
    const tempMessage = message;
    setTimeout(() => removeMessage(tempMessage), 4000);
  }, [message, removeMessage, onScreen]);

  return <PopUp onScreen={onScreen}></PopUp>;
};

export default connect(rdxState, rdxDispatch)(GlobalMessage);
