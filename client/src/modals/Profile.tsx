import React, { FC, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { Modal } from "../components";
import { animateOut } from "../redux/actions/";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
});

const withRedux = connect(() => ({}), rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Profile: FC<props> = ({ closeModal }) => {
  return <Modal></Modal>;
};

export default withRedux(Profile);
