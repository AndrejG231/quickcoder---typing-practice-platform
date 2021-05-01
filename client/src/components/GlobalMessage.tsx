import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { setGlobalMessage, animateIn, animateOut } from "../redux/actions/";
import { PopUp, MessageText, CloseIcon } from "./global_message";
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
  closePopUp: () => void;
  openPopUp: () => void;
  clearMessage: () => void;
}

const GlobalMessage: React.FC<globalMessageProps> = ({
  message,
  closePopUp,
  openPopUp,
  clearMessage,
  onScreen,
}) => {
  const [displayedMessage, setDisplayedMessage] = useState("");

  const resetMessage = () => {
    clearMessage();
    closePopUp();
    setTimeout(() => setDisplayedMessage(""), 400);
  };

  useEffect(() => {
    if (message.length > 1) {
      setTimeout(() => resetMessage(), 2500);
    }
  }, [message, resetMessage]);

  useEffect(() => {
    if (displayedMessage !== message) {
      if (message.length > 0) {
        setDisplayedMessage(message);
        openPopUp();
      } else {
        resetMessage();
      }
    }
  }, [message, displayedMessage, resetMessage]);

  return (
    <PopUp onScreen={onScreen}>
      <MessageText>{displayedMessage}</MessageText>
      <CloseIcon size="50px" onClick={resetMessage} />
    </PopUp>
  );
};

export default connect(rdxState, rdxDispatch)(GlobalMessage);
