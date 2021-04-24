import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//redux
import { setGlobalMessage } from "../redux/actions/globalMessageActions";
import { ToggleAnimationOut } from "../redux/actions/animationActions";

//graphql
import { ActionResponse } from "../types/graphql/ActResMutationsT";
import { useRetrievePasswordMutation } from "../graphql/auth";

//components
import InputField from "../components/InputField";
import { Modal } from "../components/";
import SubmitButton from "../components/SubmitButton";

const rdxDispatch = (dispatch: any) => {
  return {
    AnimeOut: () => dispatch(ToggleAnimationOut("Modal")),
    SetMessage: (message: string) => dispatch(setGlobalMessage(message)),
  };
};

interface ForgotPasswordProps {
  AnimeOut: () => void;
  SetMessage: (message: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  AnimeOut,
  SetMessage,
}) => {
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

    console.log(response);

    if (!response.success) {
      setErrors(response);
    } else {
      SetMessage(response.message);
      AnimeOut();
      setTimeout(() => nav.push("/home/"), 500);
    }
  };

  return (
    <Modal>
      <form onSubmit={(e) => e.preventDefault()}>
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
      </form>
    </Modal>
  );
};

export default connect(() => {
  return {};
}, rdxDispatch)(ForgotPassword);
