import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

//redux
import { setGlobalMessage } from "../redux/actions";

//components
import InputField from "../components/InputField";
import Modal from "../components/Modal";
import SubmitButton from "../components/SubmitButton";

//graphql
import { useChangeForgottenPasswordMutation } from "../graphql/auth";
import { ActionResponse } from "../types/auth";

const rdxDispatch = (dispatch: any) => {
  return {
    SetMessage: (message: string) => dispatch(setGlobalMessage(message)),
  };
};

export const ChangeTokenPassword: React.FC = ({ SetMessage }: any) => {
  const { token }: { token: string } = useParams();
  const nav = useHistory();

  const { mutation, validate } = useChangeForgottenPasswordMutation();
  const [changeForgottenPassword] = mutation;

  const [newPassowrd, setNewPassowrd] = useState<string>("");
  const [errors, setErrors] = useState<ActionResponse>({
    action: "",
    message: "",
    info: "",
    success: true,
  });

  const handleChangePassword = async () => {
    const response = await validate(
      changeForgottenPassword({
        variables: {
          newPassword: newPassowrd,
          token: token,
        },
      })
    );

    if (!response.success) {
      setErrors(response);
    } else {
      SetMessage(response.message);
      nav.push("/home/login/");
    }
  };

  return (
    <Modal>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputField
          label="New Password"
          error={errors}
          onEvent={(e) => setNewPassowrd(e.target.value)}
          value={newPassowrd}
          name="password"
        />
        <SubmitButton
          label="Change Password"
          error={errors.info.split("_")[1] !== "password" ? errors.message : ""}
          onEvent={() => handleChangePassword()}
        />
      </form>
    </Modal>
  );
};

export default connect(() => {}, rdxDispatch)(ChangeTokenPassword);
