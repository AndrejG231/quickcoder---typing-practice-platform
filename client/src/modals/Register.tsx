import React, { useState } from "react";

import Modal from "../components/Modal";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

export const Register = () => {
  const FieldErrors = ["username", "password"];
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    info: "",
    action: "",
    message: "",
  });
  return (
    <Modal>
      <InputField
        label="Username"
        name="username"
        value={credentials.username}
        onEvent={(event) =>
          setCredentials({
            ...credentials,
            username: event.target.value,
          })
        }
        error={errors}
      />
      <InputField
        label="Email"
        name="email"
        value={credentials.email}
        onEvent={(event) =>
          setCredentials({
            ...credentials,
            email: event.target.value,
          })
        }
        error={errors}
      />
      <InputField
        label="Password"
        name="password"
        value={credentials.password}
        type="password"
        onEvent={(event) =>
          setCredentials({
            ...credentials,
            password: event.target.value,
          })
        }
        error={errors}
      />
      <SubmitButton
        error={
          FieldErrors.some((err) => err === errors.info.split("_")[1])
            ? ""
            : errors.message
        }
        label="Create Account"
        onEvent={() => null}
      />
    </Modal>
  );
};

export default Register;
