import {toggleAnimations, AnimateAction} from "../../types/redux/AnimationT";

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


export const Animate: AnimateAction = (target, element, frame) => {
  return {
    type: "animation/animate",
    frame: frame,
    target: target,
    element: element,
  };
};

