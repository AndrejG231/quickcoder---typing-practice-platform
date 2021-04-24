import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

//redux
import { ToggleAnimationOut } from "../redux/actions/animationActions";
import { refreshAuthAction } from "../redux/actions/authActions";
import { setGlobalMessage } from "../redux/actions/globalMessageActions";

//utilities
import getClientParam from "../utilites/clientParameter";

//graphql
import { useLoginMutation } from "../graphql/auth";
import { ActionResponse } from "../types/graphql/ActResMutationsT";
import { LoginCredentials } from "../types/graphql/AuthMutationsT";

//components
import { Modal } from "../components/";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

//style

interface LoginProps {
  RefreshUserInfo: () => void;
  AnimeOut: () => void;
  SetMessage: (message: string) => void;
}

const rdxDispatch = (dispatch: any) => {
  return {
    AnimeOut: () => dispatch(ToggleAnimationOut("Modal")),
    RefreshUserInfo: () => dispatch(refreshAuthAction()),
    SetMessage: (message: string) => dispatch(setGlobalMessage(message)),
  };
};

export const Login: React.FC<LoginProps> = ({
  RefreshUserInfo,
  AnimeOut,
  SetMessage,
}) => {
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
          clientParameter: getClientParam(),
        },
      })
    );

    if (!result.success) {
      setErrors(result);
    } else {
      RefreshUserInfo();
      SetMessage(result.message + "!");
      AnimeOut();
      setTimeout(() => nav.push("/home/"), 500);
    }
  };

  return (
    <Modal>
      <form onSubmit={(e) => e.preventDefault()}>
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
          name="password"
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
      </form>
      <Link to="/home/forgot_password/" style={{ textDecoration: "none" }}>
        <p className="forgot-pass">Can't sign in?</p>
      </Link>
    </Modal>
  );
};

export default connect(() => {
  return {};
}, rdxDispatch)(Login);
