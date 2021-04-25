import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup } from "../utilites";
import { AnimeOut } from "../redux/actions/animationActions";

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

interface LoginProps {
  AnimateOut: () => void;
}

const Login: FC<LoginProps> = ({ AnimateOut }) => {
  const [inputData, setInputData] = useState(
    createInputGroup(["username or email", "password", "duude"])
  );

  const submitForm = () => {console.log("hey")};

  return (
    <Modal>
      <Form
        submitFunction={submitForm}
        page="Log in"
        data={inputData}
        setData={setInputData}
      />
    </Modal>
  );
};

export default connect(() => ({}), rdxDispatch)(Login);
