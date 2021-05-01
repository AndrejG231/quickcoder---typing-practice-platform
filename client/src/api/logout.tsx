import { api } from "../static";
import { actionResponse } from "../types";

const logoutMutation = `
  mutation {
    logout
  }
`;

type logoutOptions = {
  onSuccess: () => void;
  onError: () => void;
};

const logout = async ({ onSuccess, onError }: logoutOptions) => {
  try {
    const data = await api.post("", {
      query: logoutMutation,
    });

    const result: boolean = data.data.data.logout;

    if (result) {
      onSuccess();
    } else {
      onError();
    }
  } catch (error) {
    onError();
  }
};

export default logout;
