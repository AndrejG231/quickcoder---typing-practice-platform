import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { BsFillXSquareFill } from "react-icons/bs";
import { connect } from "react-redux";

import { setGlobalMessage } from "../redux/actions";
import { ReduxState } from "../types/redux";

import "./GlobalMessage.scss";

interface globalMessageProps {
  message: string;
  clearMessage: any;
}

const rdxState = (state: ReduxState) => {
  return {
    message: state.globalMessage.message,
  };
};
const rdxDispatch = (dispatch: any) => {
  return {
    clearMessage: () => dispatch(setGlobalMessage("")),
  };
};

const GlobalMessage: React.FC<globalMessageProps> = ({
  message,
  clearMessage,
}) => {
  useEffect(() => {
    const messageToRemove = message;
    setTimeout(() => {
      if (messageToRemove === message) {
        clearMessage();
      }
    }, 4000);
  }, [message]);
  if (message === "") {
    return <div />;
  }
  return (
    <div className="msg-container">
      <IconContext.Provider value={{ className: "msg-close-icon" }}>
        <BsFillXSquareFill onClick={() => clearMessage()}/>
      </IconContext.Provider>
      <div
        className="msg-text-container"
        style={{ width: message.length * 17.39 }}
      >
        <p className="msg-text">{message}</p>
      </div>
    </div>
  );
};

export default connect(rdxState, rdxDispatch)(GlobalMessage);
