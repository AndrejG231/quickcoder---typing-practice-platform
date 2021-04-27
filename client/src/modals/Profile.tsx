import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal } from "../components";
import { animateOut } from "../redux/actions/";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
});

interface LoginProps {
  closeModal: () => void;
}

const Login: FC<LoginProps> = ({ closeModal }) => {
  return <Modal></Modal>;
};

export default connect(() => ({}), rdxDispatch)(Login);
