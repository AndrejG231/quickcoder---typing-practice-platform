import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useAuthMutation, useErrors } from "../utilites";
import { AnimeOut } from "../redux/actions/animationActions";
import { refreshAuthAction } from "../redux/actions/authActions";
import { useLoginMutation } from "../graphql/fetching_auth";
import { useHistory } from "react-router";
import { serverError } from "../static/serverError";

const rdxDispatch = (dispatch: Dispatch) => ({
  animateOut: () => dispatch(AnimeOut("modal")),
  refreshAuth: () => dispatch(refreshAuthAction()),
});

interface LoginProps {
  animateOut: () => void;
  refreshAuth: () => void;
}

const Login: FC<LoginProps> = ({ animateOut, refreshAuth }) => {
  const nav = useHistory();
  const [errors, setErrors] = useErrors();
  const [inputData, setInputData] = useState(
    createInputGroup(["username or email", "password"], ["text", "password"])
  );

  const [login, { data, error }] = useLoginMutation();

  useAuthMutation({
    data,
    error,
    setErrors,
    field: "login",
    onSuccess: () => {
      refreshAuth();
      animateOut();
      setTimeout(() => nav.push("/home/"), 450);
    },
    onError: () => {
      setErrors(serverError);
    },
  });

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
