import React, { FC, ReactChild, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { AnimeIn, AnimeOut } from "../redux/actions/animationActions";
import { ReduxState } from "../types/redux/ReduxState";

import {
  ModalCloseButton,
  ModalWrapper,
  ModalButtonText,
  ModalContentWrapper,
} from "./components_modal/";

interface ModalProps {
  children?: ReactChild | ReactChild[];
  AnimateIn: () => void;
  AnimateOut: () => void;
  onScreen: boolean;
}

const rdxProps = (state: ReduxState) => ({
  onScreen: state.Animation.modal,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateIn: () => dispatch(AnimeIn("modal")),
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

const Modal: FC<ModalProps> = ({
  children,
  AnimateIn,
  AnimateOut,
  onScreen,
}) => {
  const nav = useHistory();

  useEffect(() => {
    AnimateIn();
    return () => {
      AnimateOut();
    };
  }, [AnimateIn, AnimateOut]);

  const closeModal = () => {
    AnimateOut();
    setTimeout(() => nav.push("/home/"), 500);
  };

  return (
    <ModalWrapper onScreen={onScreen}>
      <ModalCloseButton onClick={closeModal}>
        <ModalButtonText>BACK</ModalButtonText>
      </ModalCloseButton>
      <ModalContentWrapper>{children}</ModalContentWrapper>
    </ModalWrapper>
  );
};

export default connect(rdxProps, rdxDispatch)(Modal);
