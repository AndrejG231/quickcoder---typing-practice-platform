import { DocumentNode, gql, useMutation } from "@apollo/client";
import { actionResponseResult } from "../../types";

const loginMutation: DocumentNode = gql`
  mutation login($credentials: LoginInput!) {
    login(credentials: $credentials) {
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
  const [login, result] = useMutation(loginMutation, {
    fetchPolicy: "no-cache",
  });

  return [
    (options) =>
      login({
        variables: {
          credentials: options,
        },
      }),
    result,
  ];
};

export default useLoginMutation;
