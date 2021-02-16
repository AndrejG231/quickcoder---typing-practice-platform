import React, { useEffect } from "react";

import { connect } from "react-redux";
import { Animate } from "../redux/animations";
import { ReduxState } from "../types/redux";

const rdxState = (state: ReduxState) => {
  return {
    HomePage: state.Animations.HomePage,
    Modal: state.Animations.Modal,
    GlobalMessage: state.Animations.GlobalMessage,
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
  };
};

const AnimationProvider: React.FC<any> = ({
  HomePage,
  Animate,
  Modal,
  GlobalMessage,
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
  };

  //
  useEffect(() => {
    const Animate = setInterval(() => handleAnimation(), 25);
    return () => {
      clearInterval(Animate);
    };
  });
  return <div />;
};

export default connect(rdxState, rdxDispatch)(AnimationProvider);
