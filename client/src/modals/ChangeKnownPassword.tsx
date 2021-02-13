import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Modal from "../components/Modal";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

import { useChangeKnownPasswordMutation } from "../graphql/auth";
import { ActionResponse, changeKnownPasswordVariables } from "../types/auth";

export const ChangeKnownPassword: React.FC = () => {
  const nav = useHistory();

  const { validate, mutation } = useChangeKnownPasswordMutation();
  const [changePassword] = mutation;

  const [variables, setVariables] = useState<changeKnownPasswordVariables>({
    newPassword: "",
    originalPassword: "",
  });

  const [errors, setErrors] = useState<ActionResponse>({
    action: "",
    info: "",
    message: "",
    success: true,
  });

  const TypeErrors: string[] = ["newPassword", "password"];

  const handleChangePassword = async () => {
    const response = await validate(changePassword({ variables: variables }));

    if (!response.success) {
      setErrors(response);
    } else {
      nav.goBack();
    }
  };

  return (
    <Modal>
      <InputField
        label="Password"
        type="password"
        error={errors}
        onEvent={(event) =>
          setVariables({ ...variables, originalPassword: event.target.value })
        }
        name="password"
        value={variables.originalPassword}
      />
      <InputField
        label="New Password"
        type="password"
        error={errors}
        onEvent={(event) =>
          setVariables({ ...variables, newPassword: event.target.value })
        }
        name="newPassword"
        value={variables.newPassword}
      />
      <SubmitButton
        error={
          !TypeErrors.some((error) => error === errors.info.split("_")[1])
            ? errors.message
            : ""
        }
        label="Change Password"
        onEvent={() => handleChangePassword()}
      />
    </Modal>
  );
};

export default ChangeKnownPassword;
