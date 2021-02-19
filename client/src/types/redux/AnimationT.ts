export type animationTargets = "HomePage" | "Modal" | "GlobalMessage";

type animationElements = {
  HomePage: "main";
  Modal: "main";
  GlobalMessage: "main";
};

export type animationProperties = {
  isDisplayed: boolean;
  main: number;
};

export type AnimationStateTypes = {
  [key in animationTargets]: animationProperties;
};

export const AnimationState: AnimationStateTypes = {
  HomePage: {
    isDisplayed: false,
    main: 200,
  },
  Modal: {
    isDisplayed: false,
    main: 2200,
  },
  GlobalMessage: {
    isDisplayed: false,
    main: 300,
  },
};

//^^^^^^^^^//
// Targets //
//^^^^^^^^^//

type AnimationActionObject =
  | {
      type: "animation/turnOn" | "animation/turnOff";
      target: animationTargets;
    }
  | {
      type: "animation/animate";
      target: animationTargets;
      element: animationElements[animationTargets];
      frame: number;
    };

export interface toggleAnimations {
  (target: animationTargets): AnimationActionObject;
}

export interface AnimateAction {
  (
    target: animationTargets,
    element: animationElements[animationTargets],
    frame: number
  ): AnimationActionObject;
}
