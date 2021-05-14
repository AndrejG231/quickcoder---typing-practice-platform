import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { animateIn, animateOut, closeGlobalMessage } from "../redux/actions/";
import { PopUp, MessageText, CloseIcon } from "./global_message";
import { reduxStore } from "../types/";

const rdxProps = (state: reduxStore) => {
  return {
    message: state.globalMessage.message,
    isClosed: state.globalMessage.isClosed,
    openTime: state.globalMessage.openTime,
    isOnScreen: state.animations.message,
  };
};
const rdxDispatch = (dispatch: Dispatch) => {
  return {
    closePopUp: () => dispatch(animateOut("message")),
    openPopUp: () => dispatch(animateIn("message")),
    closeMessage: () => dispatch(closeGlobalMessage()),
  };
};

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const GlobalMessage: React.FC<props> = ({
  message,
  isClosed,
  openTime,
  closePopUp,
  openPopUp,
  closeMessage,
  isOnScreen,
}) => {
  useEffect(() => {
    const popUpTimer = setInterval(() => {
      if (!isOnScreen) {
        if (!isClosed && openTime > new Date().getTime() - 3000) {
          openPopUp();
        }
      } else {
        if (isClosed || openTime <= new Date().getTime() - 3000) {
          closePopUp();
        }
      }
    }, 100);
    return () => clearInterval(popUpTimer);
  });

  return (
    <PopUp isOnScreen={isOnScreen}>
      <MessageText>{message}</MessageText>{" "}
      <CloseIcon size="50px" onClick={closeMessage} />
    </PopUp>
  );
};

export default withRedux(GlobalMessage);
