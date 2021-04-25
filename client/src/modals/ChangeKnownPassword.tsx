import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//redux
import { refreshAuthAction } from "../redux/actions/authActions";
import { setGlobalMessage } from "../redux/actions/globalMessageActions";

//components
import { Modal } from "../components/";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

//graphql
import { useChangeKnownPasswordMutation } from "../graphql/auth";
import { ActionResponse } from "../types/graphql/ActResMutationsT";
import { ChangeKnownPasswordVariables } from "../types/graphql/AuthMutationsT";

const rdxDispatch = (dispatch: any) => {
  return {
    RefreshAuth: () => dispatch(refreshAuthAction()),
    SetMessage: (message: string) => dispatch(setGlobalMessage(message)),
  };
};

interface ChangeKnownPasswordProps {
  RefreshAuth: () => void;
  SetMessage: (message: string) => void;
  AnimeOut: () => void;
}

export const ChangeKnownPassword: React.FC<ChangeKnownPasswordProps> = ({
  RefreshAuth,
  SetMessage,
  AnimeOut,
}) => {
  const nav = useHistory();

  const { validate, mutation } = useChangeKnownPasswordMutation();
  const [changePassword] = mutation;

  const [variables, setVariables] = useState<ChangeKnownPasswordVariables>({
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
      SetMessage(response.message);
      RefreshAuth();
      setTimeout(() => nav.push("/home/login/"), 500);
    }
  };

  return (
    <Modal>
      <form onSubmit={(e) => e.preventDefault()}>
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
      </form>
    </Modal>
  );
};

export default connect(() => {}, rdxDispatch)(ChangeKnownPassword);
