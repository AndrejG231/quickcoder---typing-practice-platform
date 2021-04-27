import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useErrors } from "../utilites";
import { animateOut, toggleAuthRefresh } from "../redux/actions/";
import { useHistory } from "react-router";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
  refreshAuth: () => dispatch(toggleAuthRefresh(true)),
});

interface LoginProps {
  closeModal: () => void;
  refreshAuth: () => void;
}

const Login: FC<LoginProps> = ({ closeModal, refreshAuth }) => {
  const nav = useHistory();
  const [errors, setErrors] = useErrors();
  const [inputData, setInputData] = useState(
    createInputGroup(["username or email", "password"], ["text", "password"])
  );

  //---trp
  const login = (a: any) => null;

  const submitForm = () => {
    login({
      identification: inputData["username or email"].value,
      password: inputData.password.value,
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
