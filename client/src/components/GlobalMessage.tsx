import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { setGlobalMessage, animateIn, animateOut } from "../redux/actions/";
import { PopUp, MessageText, CloseIcon } from "./global_message";
import { reduxStore } from "../types/";

const rdxProps = (state: reduxStore) => {
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

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const GlobalMessage: React.FC<props> = ({
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

export default withRedux(GlobalMessage);
