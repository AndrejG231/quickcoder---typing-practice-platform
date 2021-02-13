import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InputField from "../components/InputField";

import Modal from "../components/Modal";
import SubmitButton from "../components/SubmitButton";
import { useChangeForgottenPasswordMutation } from "../graphql/auth";
import { ActionResponse } from "../types/auth";

export const ChangeTokenPassword: React.FC = () => {
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
      nav.push("/home/login/")
    }
  };

  return (
    <Modal>
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
    </Modal>
  );
};

export default ChangeTokenPassword;
