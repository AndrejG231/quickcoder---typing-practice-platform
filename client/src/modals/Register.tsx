import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useErrors } from "../utilites";
import { animateOut } from "../redux/actions/";
import { serverError } from "../static/";
import { useHistory } from "react-router";

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

  // --trp
  const register = (a: any) => {};

  const submitForm = () => {
    register({
      email: inputData.email.value,
      username: inputData.username.value,
      password: inputData.password.value,
    });
  };

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
