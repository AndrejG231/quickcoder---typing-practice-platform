import React, { FC, ReactChild, useEffect } from "react";
import { connect } from "react-redux";
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
  useEffect(() => {
    AnimateIn();
    return () => {
      AnimateOut();
    };
  }, [AnimateIn, AnimateOut]);

  return (
    <ModalWrapper onScreen={onScreen}>
      <ModalCloseButton>
        <ModalButtonText>BACK</ModalButtonText>
      </ModalCloseButton>
      <ModalContentWrapper>{children}</ModalContentWrapper>
    </ModalWrapper>
  );
};

export default connect(rdxProps, rdxDispatch)(Modal);
