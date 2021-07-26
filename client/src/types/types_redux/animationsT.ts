export type field =
  | "modal"
  | "home"
  | "message"
  | "profileContainer"
  | "profileChild";

export type animations = {
  [key in field]: boolean;
};

export type action = {
  type: string;
  field: field;
};

export type reducer = {
  (state: animations, action: action): animations;
};
