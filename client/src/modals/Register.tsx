import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useErrors } from "../utilites";
import { AnimeOut } from "../redux/actions/animationActions";
import { useRegisterMutation } from "../graphql/fetching_auth";
import { useHistory } from "react-router";

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

interface RegisterProps {
  AnimateOut: () => void;
}

const registerFields = ["username", "email", "password"];
const registerTypes = ["text", "email", "password"];

const Register: FC<RegisterProps> = ({ AnimateOut }) => {
  const nav = useHistory();
  const [inputData, setInputData] = useState(
    createInputGroup(registerFields, registerTypes)
  );

  const [errors, setErrors] = useErrors();

  const [register, { data, error, fetching }] = useRegisterMutation();

  const submitForm = () => {
    register({
      variables: {
        credentials: {
          email: inputData.email.value,
          username: inputData.username.value,
          password: inputData.password.value,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.register.success) {
        AnimateOut();
        setTimeout(() => nav.push("/home/login/"), 400);
      } else {
        const field = data.register.info.split("_")[1];
        setErrors({ field, value: data.register.message });
      }
    } else if (error) {
    }
  }, [data, error, setInputData, AnimateOut]);

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
