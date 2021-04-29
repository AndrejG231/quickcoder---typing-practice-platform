import { formError, actionResponse } from "../../types";
import { api, serverError } from "../../static";

const loginMutation = `
  mutation login($credentials: LoginInput!) {
    login(credentials: $credentials) {
      info
      action
      success
      message
    }
  }
`;

type loginCredentials = {
  identification: string;
  password: string;
};

type loginOptions = {
  onSuccess: () => void;
  setErrors: (errors: formError) => void;
  credentials: loginCredentials;
};

const login = async ({ credentials, onSuccess, setErrors }: loginOptions) => {
  try {
    const data = await api.post("", {
      query: loginMutation,
      variables: { credentials: credentials },
    });

    const result: actionResponse = data.data.data.login;


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

export default login;
