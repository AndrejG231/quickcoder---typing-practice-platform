import React, { useState } from "react";
import InputField from "../components/InputField";

import Modal from "../components/Modal";
import SubmitButton from "../components/SubmitButton";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    action: "",
    info: "",
    message: "",
  });

  return (
    <Modal>
      <InputField
        value={email}
        name="email"
        label="Email"
        onEvent={() => null}
        error={errors}
        type="email"
      />
      <SubmitButton
        label="Reset Password"
        error={errors.info.split("_")[1] !== "email" ? errors.message : ""}
        onEvent={() => null}
      />
    </Modal>
  );
};

export default ForgotPassword;
