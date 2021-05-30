import React, { FC, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { Modal, Form } from "../components";
import { useErrors } from "../utilites";
import { animateOut } from "../redux/actions/";
import { inputData } from "../types";

const rdxDispatch = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(animateOut("modal")),
});

const withRedux = connect(() => ({}), rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const ChangeTokenPassword: FC<props> = ({ closeModal }) => {
  const [errors, setErrors] = useErrors();
  const [inputData, setInputData] = useState<inputData>({
    password: {
      type: "password",
      value: "",
    },
    "new password": {
      type: "password",
      value: "",
    },
    "repeat new password": {
      type: "password",
      value: "",
    },
  });

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

export default withRedux(ChangeTokenPassword);
