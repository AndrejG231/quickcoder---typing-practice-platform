import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup } from "../utilites";
import { AnimeOut } from "../redux/actions/animationActions";

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

interface ForgotPasswordProps {
  AnimateOut: () => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ AnimateOut }) => {
  const [inputData, setInputData] = useState(
    createInputGroup(["email"], ["email"])
  );

  const submitForm = () => {};

  return (
    <Modal>
      <Form
        submitFunction={submitForm}
        page="Recover password"
        data={inputData}
        setData={setInputData}
      />
    </Modal>
  );
};

export default connect(() => ({}), rdxDispatch)(ForgotPassword);
