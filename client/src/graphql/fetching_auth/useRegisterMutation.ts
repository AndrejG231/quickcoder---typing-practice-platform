import { DocumentNode, gql, useMutation } from "@apollo/client";

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
  (options: {
    variables: {
      credentials: { username: string; email: string; password: string };
    };
  }): void;
};

type RegisterResults = {
  data?: {
    register: {
      success: boolean;
      action: string;
      info: string;
      message: string;
    };
  } | null;

  fetching?: boolean;
  error?: any;
};

type RegisterMutation = {
  (): [RegisterInput, RegisterResults];
};

const useRegisterMutation: RegisterMutation = () => {
  return useMutation(registerMutation);
};

export default useRegisterMutation;
