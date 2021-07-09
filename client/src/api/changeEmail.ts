import { api } from "../static";
import { actionResponse, formError } from "../types";

const changeEmailMutation = `
  mutation changeEmail($newEmail:String!, $password:String!){
    changeEmail(newEmail:$newEmail, password:$password){
      info
      success
      message
    }
  }
`;

type changeEmailCredentials = {
  newEmail: string;
  password: string;
};

type changeEmailOptions = {
  onSuccess: () => void;
  setErrors: (error: formError) => void;
  credentials: changeEmailCredentials;
};

const changeUsername = async ({
  onSuccess,
  setErrors,
  credentials,
}: changeEmailOptions) => {
  try {
    const queryResult = await api.post("", {
      query: changeEmailMutation,
      variables: credentials,
    });

    const data: actionResponse = queryResult.data?.data?.changeEmail;

    if (data?.success) {
      return onSuccess();
    } else {
      if (data?.info && data?.message) {
        return setErrors({
          field: data.info.split("_")[1],
          value: data.message,
        });
      }
    }
    return setErrors({
      field: "global",
      value: "Couldn't connect to the server.",
    });
  } catch (error) {
    return setErrors({
      field: "global",
      value: "Couldn't connect to the server.",
    });
  }
};

export default changeUsername;
