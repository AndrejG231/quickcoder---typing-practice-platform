import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useErrors } from "../utilites";
import { animateOut } from "../redux/actions/";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
});

interface ForgotPasswordProps {
  closeModal: () => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ closeModal }) => {
  const [errors, setErrors] = useErrors();
  const [inputData, setInputData] = useState(
    createInputGroup(["email"], ["email"])
  );

  const submitForm = () => {};

  return (
    <Modal>
      <Form
        errors={errors}
        submitFunction={submitForm}
        page="Recover password"
        data={inputData}
        setData={setInputData}
      />
    </Modal>
  );
};

export default connect(() => ({}), rdxDispatch)(ForgotPassword);
