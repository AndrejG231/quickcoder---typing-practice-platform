import { api } from "../static";
import { actionResponse, formError } from "../types";

const changePasswordMutation = `
  mutation changeKnownPassword($originalPassword:String!, $newPassword:String!){
    changeKnownPassword(newPassword:$newPassword, orginalPassword:$originalPassword){
      success
      info
      message
    }
  }
`;

type changePasswordCredentials = {
  newPassword: string;
  originalPassword: string;
};

type changePasswordOptions = {
  onSuccess: () => void;
  setErrors: (error: formError) => void;
  credentials: changePasswordCredentials;
};

const changePassword = async ({
  onSuccess,
  setErrors,
  credentials,
}: changePasswordOptions) => {
  try {
    const queryResult = await api.post("", {
      query: changePasswordMutation,
      variables: credentials,
    });

    const data: actionResponse = queryResult.data?.data?.changeKnownPassword;

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

export default changePassword;
