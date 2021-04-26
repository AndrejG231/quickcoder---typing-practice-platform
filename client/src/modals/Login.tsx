import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useErrors } from "../utilites";
import { AnimeOut } from "../redux/actions/animationActions";

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

interface LoginProps {
  AnimateOut: () => void;
}

const Login: FC<LoginProps> = ({ AnimateOut }) => {
  const [errors, setErrors] = useErrors();
  const [inputData, setInputData] = useState(
    createInputGroup(["username or email", "password"], ["text", "password"])
  );

  const submitForm = () => {};

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
