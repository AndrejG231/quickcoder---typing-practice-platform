import { api, serverError } from "../static";
import { formError, actionResponse } from "../types";

const registerMutation = `
  mutation Register($credentials: RegisterInput!) {
    register(credentials: $credentials) {
      success
      info
      message
    }
  }
`;

type registerCredentials = {
  username: string;
  email: string;
  password: string;
};

type registerOptions = {
  onSuccess: () => void;
  setErrors: (errors: formError) => void;
  credentials: registerCredentials;
};

const register = async ({
  credentials,
  onSuccess,
  setErrors,
}: registerOptions) => {
  try {
    const data = await api.post("", {
      query: registerMutation,
      variables: { credentials: credentials },
    });

    const result: actionResponse = data.data.data.register;

    if (result?.success) {
      onSuccess();
    } else {
      const error = {
        field: result.info.split("_")[1],
        value: result.message,
      };
      setErrors(error);
    }
  } catch (error) {
    setErrors(serverError);
  }
};

export default register;
