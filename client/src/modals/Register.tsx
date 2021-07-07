import React, { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { useErrors } from "../utilites";
import { animateOut, setGlobalMessage } from "../redux/actions/";
import { useHistory } from "react-router-dom";
import { register } from "../api/";
import { inputData } from "../types";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
  setGlobalMessage: (message: string) => dispatch(setGlobalMessage(message)),
});

const withRedux = connect(() => ({}), rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Register: FC<props> = ({ closeModal, setGlobalMessage }) => {
  const nav = useHistory();
  const [inputData, setInputData] = useState<inputData>({
    username: {
      type: "text",
      value: "",
    },
    email: {
      type: "email",
      value: "",
    },
    password: {
      type: "password",
      value: "",
    },
  });

  const [errors, setErrors] = useErrors();

  const handleFormSubmit = () => {
    register({
      credentials: {
        email: inputData.email.value,
        username: inputData.username.value,
        password: inputData.password.value,
      },
      onSuccess: () => {
        setGlobalMessage("Successfully created account! Please log in.");
        nav.push("/home/login/");
      },
      setErrors: setErrors,
    });
  };

  return (
    <Modal>
      <Form
        submitFunction={handleFormSubmit}
        page="register"
        data={inputData}
        setData={setInputData}
        errors={errors}
      />
    </Modal>
  );
};

export default withRedux(Register);
