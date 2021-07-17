import { api } from "../static";
import { actionResponse, formError } from "../types";

const deleteAccountMutation = `
  mutation deleteAccount($password: String!){
    deleteAccount(password:$password){
      success
      info
      message
    }
  } 
`;

type deleteAcountOptions = {
  onSuccess: () => void;
  setErrors: (error: formError) => void;
  password: string;
};

const deleteAccount = async ({
  onSuccess,
  setErrors,
  password,
}: deleteAcountOptions) => {
  try {
    const queryResult = await api.post("", {
      query: deleteAccountMutation,
      variables: { password },
    });

    const data: actionResponse = queryResult.data?.data?.deleteAccount;

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

export default deleteAccount;
