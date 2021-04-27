import { gql, useMutation } from "@apollo/client";

const logoutMutation = gql`
  mutation {
    logout
  }
`;

type LogoutMutation = {
  (): [() => void, { data?: { logout?: boolean } | null; error?: any }];
};

const useLogoutMutation: LogoutMutation = () => {
  return useMutation(logoutMutation);
};

export default useLogoutMutation;
