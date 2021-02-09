import React, { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../components/Modal";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

//style
import "./Login.css";

export const Login = () => {
  const FieldErrors = ["username", "password"];
  const [credentials, setCredentials] = useState({
    identification: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    action: "",
    info: "",
    message: "",
  });

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
        onEvent={() => console.log()}
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
