export interface globalMessage {
  message: string;
}

interface globalMessageAction {
  message: string;
  type: "message/set";
}

export interface setGlobalMessageAction {
  (message: string): globalMessageAction;
}


export interface GlobalMessageReducer {
  (state: globalMessage, action: globalMessageAction): globalMessage;
}

