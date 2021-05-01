import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useErrors } from "../utilites";
import { login } from "../api/";
import {
  animateOut,
  toggleAuthRefresh,
  setGlobalMessage,
} from "../redux/actions/";
import { useHistory } from "react-router";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
  refreshAuth: () => dispatch(toggleAuthRefresh(true)),
  setGlobalMessage: (message: string) => dispatch(setGlobalMessage(message)),
});

interface LoginProps {
  closeModal: () => void;
  refreshAuth: () => void;
  setGlobalMessage: (message: string) => void;
}

const Login: FC<LoginProps> = ({
  closeModal,
  refreshAuth,
  setGlobalMessage,
}) => {
  const nav = useHistory();
  const [errors, setErrors] = useErrors();
  const [inputData, setInputData] = useState(
    createInputGroup(["username or email", "password"], ["text", "password"])
  );

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

export default connect(() => ({}), rdxDispatch)(Login);
