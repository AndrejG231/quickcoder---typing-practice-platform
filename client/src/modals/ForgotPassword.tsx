import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { ActionResponse } from "../types/auth";
import { useRetrievePasswordMutation } from "../graphql/auth";

import InputField from "../components/InputField";
import Modal from "../components/Modal";
import SubmitButton from "../components/SubmitButton";

export const ForgotPassword: React.FC<{}> = () => {
  const { validate, mutation } = useRetrievePasswordMutation();
  const [register] = mutation;

  const nav = useHistory();

  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<ActionResponse>({
    success: true,
    action: "",
    info: "",
    message: "",
  });

  const handleForgotPassword = async () => {
    const response = await validate(
      register({ variables: { email: email, clientInfo: "client" } })
    );

    console.log(response)

    if (!response.success) {
      setErrors(response);
    } else {
      nav.push("/home/");
    }
  };

  return (
    <Modal>
      <InputField
        value={email}
        name="email"
        label="Email"
        onEvent={(event) => setEmail(event.target.value)}
        error={errors}
        type="email"
      />
      <SubmitButton
        label="Reset Password"
        error={errors.info.split("_")[1] !== "email" ? errors.message : ""}
        onEvent={() => handleForgotPassword()}
      />
    </Modal>
  );
};

export default ForgotPassword;
