export type globalMessage = {
  message: string;
};

export type action = {
  message: string;
  type: "message/set";
};

export type reducer = {
  (state: globalMessage, action: action): globalMessage;
};
