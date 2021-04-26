import { DocumentNode, gql, useMutation } from "@apollo/client";
import { actionResponseResult } from "../../types";

const registerMutation: DocumentNode = gql`
  mutation Register($credentials: RegisterInput!) {
    register(credentials: $credentials) {
      success
      action
      info
      message
    }
  }
`;

type RegisterInput = {
  (options: { username: string; email: string; password: string }): void;
};

type RegisterMutation = {
  (): [RegisterInput, actionResponseResult];
};

const useRegisterMutation: RegisterMutation = () => {
  const [register, result] = useMutation(registerMutation);
  return [
    (options) => register({ variables: { credentials: options } }),
    result,
  ];
};

export default useRegisterMutation;
