export type animationObjectsList = "modal" | "home";

export type animationStateT = {
  [key in animationObjectsList]: boolean;
};

type animationAction = {
  type: string;
  field: animationObjectsList;
};

export type animationsReducerT = {
  (state: animationStateT, action: animationAction): animationStateT;
};
