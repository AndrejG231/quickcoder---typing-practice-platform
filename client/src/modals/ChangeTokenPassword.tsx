import React, { FC, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { createInputGroup, useErrors } from "../utilites";
import { animateOut } from "../redux/actions/";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
});

const withRedux = connect(() => ({}), rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const ChangeKnownPassword: FC<props> = ({ closeModal }) => {
  const [errors, setErrors] = useErrors();
  const [inputData, setInputData] = useState(
    createInputGroup(
      ["new password", "repeat new password"],
      ["password", "password"]
    )
  );

  const submitForm = () => {};

  return (
    <Modal>
      <Form
        errors={errors}
        submitFunction={submitForm}
        page="Change password"
        data={inputData}
        setData={setInputData}
      />
    </Modal>
  );
};

export default withRedux(ChangeKnownPassword);
