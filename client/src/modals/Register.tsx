import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useErrors } from "../utilites";
import { animateOut } from "../redux/actions/";
import { useHistory } from "react-router";
import { register } from "../api/auth";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
});

interface RegisterProps {
  closeModal: () => void;
}

const Register: FC<RegisterProps> = ({ closeModal }) => {
  const nav = useHistory();
  const [inputData, setInputData] = useState(
    createInputGroup(
      ["username", "email", "password"],
      ["text", "email", "password"]
    )
  );

  const [errors, setErrors] = useErrors();

  const handleFormSubmit = () => {
    register({
      credentials: {
        email: inputData.email.value,
        username: inputData.username.value,
        password: inputData.password.value,
      },
      onSuccess: () => {
        setTimeout(() => nav.push("/home/login/"), 400);
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

export default connect(() => ({}), rdxDispatch)(Register);
