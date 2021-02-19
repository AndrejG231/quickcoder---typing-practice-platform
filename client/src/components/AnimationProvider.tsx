import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Animate } from "../redux/actions/animationActions";
import { animatePracticeOffset } from "../redux/actions/practiceActions";

//types
import { ReduxState } from "../types/redux/ReduxState";
import { animationProperties } from "../types/redux/AnimationT";

const rdxState = (state: ReduxState) => {
  return {
    HomePage: state.Animations.HomePage,
    Modal: state.Animations.Modal,
    GlobalMessage: state.Animations.GlobalMessage,
    PracticeLettersOffset: state.Practice.errorsCount + state.Practice.index,
    PracticeOffset: state.PracticeOffset,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    Animate: {
      HomePage: {
        main: (frame: number) => dispatch(Animate("HomePage", "main", frame)),
      },
      Modal: {
        main: (frame: number) => dispatch(Animate("Modal", "main", frame)),
      },
      GlobalMessage: {
        main: (frame: number) =>
          dispatch(Animate("GlobalMessage", "main", frame)),
      },
    },
    AddOffset: () => dispatch(animatePracticeOffset()),
  };
};

interface MainAnimation {
  main: (frame: number) => void;
}

interface AnimateT {
  [key: string]: MainAnimation;
}

interface AnimationProviderProps {
  HomePage: animationProperties;
  Modal: animationProperties;
  GlobalMessage: animationProperties;
  PracticeLettersOffset: number;
  PracticeOffset: number;
  Animate: AnimateT;
  AddOffset: () => void;
}

const AnimationProvider: React.FC<AnimationProviderProps> = ({
  HomePage,
  Animate,
  Modal,
  GlobalMessage,
  PracticeLettersOffset,
  PracticeOffset,
  AddOffset,
}) => {
  const handleAnimation = () => {
    //Home
    if (HomePage.main > 0 && HomePage.isDisplayed) {
      Animate.HomePage.main(-50);
    } else if (HomePage.main < 200 && !HomePage.isDisplayed) {
      Animate.HomePage.main(50);
    }
    //Modal
    if (Modal.main > 0 && Modal.isDisplayed) {
      Animate.Modal.main(-200);
    } else if (Modal.main < 2000 && !Modal.isDisplayed) {
      Animate.Modal.main(200);
    }
    //Message
    if (GlobalMessage.main > 0 && GlobalMessage.isDisplayed) {
      Animate.GlobalMessage.main(-30);
    } else if (GlobalMessage.main < 300 && !GlobalMessage.isDisplayed) {
      Animate.GlobalMessage.main(30);
    }

    //Practice text line
    if (PracticeLettersOffset * 22 > PracticeOffset) {
      AddOffset();
    }
  };

  //
  useEffect(() => {
    const Animate = setInterval(() => handleAnimation(), 15);
    return () => {
      clearInterval(Animate);
    };
  });
  return <div />;
};

export default connect(rdxState, rdxDispatch)(AnimationProvider);
