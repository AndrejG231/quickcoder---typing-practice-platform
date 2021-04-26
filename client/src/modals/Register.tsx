import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useAuthMutation, useErrors } from "../utilites";
import { AnimeOut } from "../redux/actions/animationActions";
import { serverError } from "../static";
import { useRegisterMutation } from "../graphql/fetching_auth";
import { useHistory } from "react-router";

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

interface RegisterProps {
  AnimateOut: () => void;
}

const Register: FC<RegisterProps> = ({ AnimateOut }) => {
  const nav = useHistory();
  const [inputData, setInputData] = useState(
    createInputGroup(
      ["username", "email", "password"],
      ["text", "email", "password"]
    )
  );

  const [errors, setErrors] = useErrors();

  const [register, { data, error }] = useRegisterMutation();

  const submitForm = () => {
    register({
      email: inputData.email.value,
      username: inputData.username.value,
      password: inputData.password.value,
    });
  };

  useAuthMutation({
    data,
    error,
    setErrors,
    field: "register",
    onError: () => setErrors(serverError),
    onSuccess: () => {
      AnimateOut();
      setTimeout(() => nav.push("/home/login/"), 400);
    },
  });

  return (
    <Modal>
      <Form
        submitFunction={submitForm}
        page="register"
        data={inputData}
        setData={setInputData}
        errors={errors}
      />
    </Modal>
  );
};

export default connect(() => ({}), rdxDispatch)(Register);
