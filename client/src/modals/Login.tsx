import React, { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal } from "../components";
import { AnimeOut } from "../redux/actions/animationActions";

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

interface LoginProps {
  AnimateOut: () => void;
}

const Login: FC<LoginProps> = ({ AnimateOut }) => {
  return (
    <Modal>
      <button onClick={AnimateOut}>Hide moda</button>Hello
    </Modal>
  );
};

export default connect(() => ({}), rdxDispatch)(Login);
