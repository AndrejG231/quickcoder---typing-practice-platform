import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup } from "../utilites";
import { AnimeOut } from "../redux/actions/animationActions";

const rdxDispatch = (dispatch: Dispatch) => ({
  AnimateOut: () => dispatch(AnimeOut("modal")),
});

interface ChangePasswordProps {
  AnimateOut: () => void;
}

const ChangeTokenPassword: FC<ChangePasswordProps> = ({ AnimateOut }) => {
  const [inputData, setInputData] = useState(
    createInputGroup(
      ["password", "new password", "repeat new password"],
      ["password", "password", "password"]
    )
  );

  const submitForm = () => {};

  return (
    <Modal>
      <Form
        submitFunction={submitForm}
        page="Change password"
        data={inputData}
        setData={setInputData}
      />
    </Modal>
  );
};

export default connect(() => ({}), rdxDispatch)(ChangeTokenPassword);
