import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup } from "../utilites";
import { AnimeOut } from "../redux/actions/animationActions";

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

interface RegisterProps {
  AnimateOut: () => void;
}

const Register: FC<RegisterProps> = ({ AnimateOut }) => {
  const [inputData, setInputData] = useState(
    createInputGroup(
      ["username", "email", "password"],
      ["text", "email", "password"]
    )
  );

  const submitForm = () => {};

  return (
    <Modal>
      <Form
        submitFunction={submitForm}
        page="register"
        data={inputData}
        setData={setInputData}
      />
    </Modal>
  );
};

export default connect(() => ({}), rdxDispatch)(Register);
