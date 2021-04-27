import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";

import { setGlobalMessage } from "../redux/actions/setGlobalMessage";
import { ReduxState } from "../types/reduxStore";

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
  const RemoveMessageHandler = useCallback(() => {
    const messageToRemove = message;
    if (messageToRemove === message) {
      setTimeout(() => clearMessage(), 1500);
    }
  }, [clearMessage, message]);

  useEffect(() => {
    setTimeout(() => RemoveMessageHandler(), 4000);
  }, [RemoveMessageHandler]);

  if (message === "") {
    return <div />;
  }
  return (
    <div className="msg-container">
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
