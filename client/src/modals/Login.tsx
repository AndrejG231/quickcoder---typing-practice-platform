import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useLoginMutation } from "../graphql/auth";
import { ActionResponse, LoginCredentials } from "../types/auth";

import Modal from "../components/Modal";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

//style
import "./Login.scss";

export const Login: React.FC = () => {
  const { validate, mutation } = useLoginMutation();

  const [login] = mutation;
  const nav = useHistory();

  const FieldErrors = ["username", "password"];

  const [credentials, setCredentials] = useState<LoginCredentials>({
    identification: "",
    password: "",
  });

  const [errors, setErrors] = useState<ActionResponse>({
    action: "",
    info: "",
    message: "",
    success: true,
  });

  const handleLogin = async () => {
    const result = await validate(
      login({
        variables: {
          credentials: credentials,
          clientParameter: "graaphql",
        },
      })
    );

    if (!result.success) {
      setErrors(result);
    } else {
      nav.push("/home/");
    }
  };

  return (
    <Modal contentClass="lg-container">
      <InputField
        label={"Username or email"}
        name="username"
        error={errors}
        value={credentials.identification}
        onEvent={(event: any) => {
          setCredentials({
            ...credentials,
            identification: event.target.value,
          });
        }}
      />
      <InputField
        label={"Password"}
        error={errors}
        value={credentials.password}
        type="password"
        onEvent={(event: any) => {
          setCredentials({
            ...credentials,
            password: event.target.value,
          });
        }}
      />
      <SubmitButton
        onEvent={() => handleLogin()}
        label="LOG IN"
        error={
          !FieldErrors.some((err) => err === errors.info.split("_")[1])
            ? errors.message
            : ""
        }
      />
      <Link to="/home/forgot_password/" style={{ textDecoration: "none" }}>
        <p className="forgot-pass">Can't sign in?</p>
      </Link>
    </Modal>
  );
};

export default Login;
