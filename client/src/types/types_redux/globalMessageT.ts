export type globalMessage = {
  message: string;
  openTime: number;
  isClosed: boolean;
};

export type action = {
  message: string;
  type: "message/set";
} | {
  type: "message/close"
};

export type reducer = {
  (state: globalMessage, action: action): globalMessage;
};
