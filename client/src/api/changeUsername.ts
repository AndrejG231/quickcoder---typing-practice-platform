import { api } from "../static";
import { actionResponse, formError } from "../types";

const changeUsernameMutation = `
  mutation changeUsername($newUsername:String!, $password:String!){
    changeUsername(newUsername:$newUsername, password:$password){
      info
      success
      message
    }
  }
`;

type changeUsernameCredentials = {
  newUsername: string;
  password: string;
};

type changeUsernameOptions = {
  onSuccess: () => void;
  setErrors: (error: formError) => void;
  credentials: changeUsernameCredentials;
};

const changeUsername = async ({
  onSuccess,
  setErrors,
  credentials,
}: changeUsernameOptions) => {
  try {
    const queryResult = await api.post("", {
      query: changeUsernameMutation,
      variables: credentials,
    });

    const data: actionResponse = queryResult.data?.data?.changeUsername;

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
