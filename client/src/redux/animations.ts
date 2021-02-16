type animationTargets = "HomePage" | "Modal" | "GlobalMessage";

type animationElements = {
  HomePage: "main",
  Modal: "main",
  GlobalMessage: "main"
};

export const AnimationState = {
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
  }
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

interface toggleAnimations {
  (target: animationTargets): AnimationActionObject;
}

export const ToggleAnimationIn: toggleAnimations = (target) => {
  return {
    type: "animation/turnOn",
    target: target,
  };
};

export const ToggleAnimationOut: toggleAnimations = (target) => {
  return {
    type: "animation/turnOff",
    target: target,
  };
};

interface AnimateAction {
  (
    target: animationTargets,
    element: animationElements[animationTargets],
    frame: number
  ): AnimationActionObject;
}

export const Animate: AnimateAction = (target, element, frame) => {
  return {
    type: "animation/animate",
    frame: frame,
    target: target,
    element: element,
  };
};

