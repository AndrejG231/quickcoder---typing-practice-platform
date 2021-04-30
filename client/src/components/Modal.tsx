import React, { FC, ReactChild, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { animateIn, animateOut } from "../redux/actions/";
import { reduxStore } from "../types/";

import {
  ModalCloseButton,
  ModalWrapper,
  ModalButtonText,
  ModalContentWrapper,
} from "./modal/";
import { NeglectBackground } from "./";

interface ModalProps {
  children?: ReactChild | ReactChild[];
  animateIn: () => void;
  animateOut: () => void;
  isOnScreen: boolean;
}

const rdxProps = (state: reduxStore) => ({
  isOnScreen: state.animations.modal,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  animateIn: () => dispatch(animateIn("modal")),
  animateOut: () => dispatch(animateOut("modal")),
});

const Modal: FC<ModalProps> = ({
  children,
  animateIn,
  animateOut,
  isOnScreen,
}) => {
  const nav = useHistory();

  useEffect(() => {
    animateIn();
    return () => {
      animateOut();
    };
  }, [animateIn, animateOut]);

  const closeModal = () => {
    animateOut();
    setTimeout(() => nav.push("/home/"), 500);
  };

  return (
    <NeglectBackground darken={isOnScreen}>
      <ModalWrapper isOnScreen={isOnScreen}>
        <ModalCloseButton onClick={closeModal}>
          <ModalButtonText>BACK</ModalButtonText>
        </ModalCloseButton>
        <ModalContentWrapper>{children}</ModalContentWrapper>
      </ModalWrapper>
    </NeglectBackground>
  );
};

export default connect(rdxProps, rdxDispatch)(Modal);
