import React, { FC, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { useErrors } from "../utilites";
import { login } from "../api/";
import {
  animateOut,
  toggleAuthRefresh,
  setGlobalMessage,
  resetProfile,
} from "../redux/actions/";
import { useHistory } from "react-router-dom";
import { inputData } from "../types";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
  refreshAuth: () => {
    dispatch(toggleAuthRefresh(true));
    dispatch(resetProfile("all"));
  },
  setGlobalMessage: (message: string) => dispatch(setGlobalMessage(message)),
});

const withRedux = connect(() => ({}), rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Login: FC<props> = ({ closeModal, refreshAuth, setGlobalMessage }) => {
  const nav = useHistory();
  const [errors, setErrors] = useErrors();
  const [inputData, setInputData] = useState<inputData>({
    "username or email": { type: "text", value: "" },
    password: { type: "password", value: "" },
  });

  const submitForm = () => {
    login({
      credentials: {
        identification: inputData["username or email"].value,
        password: inputData.password.value,
      },
      onSuccess: () => {
        closeModal();
        refreshAuth();
        setTimeout(() => {
          nav.push("/home/");
          setGlobalMessage("Successfully logged in!");
        }, 400);
      },
      setErrors: setErrors,
    });
  };

  return (
    <Modal>
      <Form
        errors={errors}
        submitFunction={submitForm}
        page="Log in"
        data={inputData}
        setData={setInputData}
      />
    </Modal>
  );
};

export default withRedux(Login);
