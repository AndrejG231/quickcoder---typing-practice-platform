import { DocumentNode, gql, useMutation } from "@apollo/client";
import { actionResponseResult } from "../../types";


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
