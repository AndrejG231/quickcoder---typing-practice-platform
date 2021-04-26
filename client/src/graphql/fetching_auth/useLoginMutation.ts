import { DocumentNode, gql, useMutation } from "@apollo/client";
import { actionResponseResult } from "../../types";
import getClientParam from "../../utilites/clientParameter";

const loginMutation: DocumentNode = gql`
  mutation login($credentials: LoginInput!, $clientParameter: String!) {
    login(credentials: $credentials, clientParameter: $clientParameter) {
      info
      action
      success
      message
    }
  }
`;

type LoginInput = {
  (options: { identification: string; password: string }): void;
};

type LoginMutation = {
  (): [LoginInput, actionResponseResult];
};

const useLoginMutation: LoginMutation = () => {
  const [login, result] = useMutation(loginMutation);

  return [
    (options) =>
      login({
        variables: {
          credentials: options,
          clientParameter: getClientParam(),
        },
      }),
    result,
  ];
};

export default useLoginMutation;
