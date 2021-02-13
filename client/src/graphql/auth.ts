import { DocumentNode, gql, MutationTuple } from "@apollo/client";
import { LoginCredentials, RegisterCredentials } from "../types/auth";
import {
  ActionResponseMutation,
  connectServerError,
  validateResultFunction,
} from "./general";

//REGISTER

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

interface RegisterMutation {
  (): {
    validate: validateResultFunction;
    mutation: MutationTuple<
      { variables: { credentials: RegisterCredentials } },
      any
    >;
  };
}

export const useRegisterMutation: RegisterMutation = () => {
  return ActionResponseMutation(
    "register",
    connectServerError("register"),
    registerMutation
  );
};

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

//LOGIN

interface LoginMutation {
  (): {
    validate: validateResultFunction;
    mutation: MutationTuple<
      { variables: { credentials: LoginCredentials; clientParameter: string } },
      any
    >;
  };
}

export const useLoginMutation: LoginMutation = () => {
  return ActionResponseMutation(
    "login",
    connectServerError("login"),
    loginMutation
  );
};

//RETRIEVE PASSWORD TOKEN

interface RetrievePasswordMutation {
  (): {
    validate: validateResultFunction;
    mutation: MutationTuple<
      { variables: { email: string; clientInfo: string } },
      any
    >;
  };
}

const retrievePasswordMutation = gql`
  mutation retrievePasswordToken($clientInfo: String!, $email: String!) {
    retrievePasswordToken(clientInfo: $clientInfo, email: $email) {
      action
      info
      message
      success
    }
  }
`;

export const useRetrievePasswordMutation: RetrievePasswordMutation = () => {
  return ActionResponseMutation(
    "retrievePasswordToken",
    connectServerError("retrievePassword"),
    retrievePasswordMutation
  );
};

//CHANGE PASSWORD WITH TOKEN

const changeForgottenPasswordMutation = gql`
  mutation changeForgottenPassword($newPassword: String!, $token: String!) {
    changeForgottenPassword(newPassword: $newPassword, token: $token) {
      success
      action
      info
      message
    }
  }
`;

interface ChangeForgottenPasswordMutation {
  (): {
    validate: validateResultFunction;
    mutation: MutationTuple<
      { variables: { newPassword: string; token: string } },
      any
    >;
  };
}

export const useChangeForgottenPasswordMutation: ChangeForgottenPasswordMutation = () => {
  return ActionResponseMutation(
    "changeForgottenPassword",
    connectServerError("retrievePassword"),
    changeForgottenPasswordMutation
  );
};

//CHANGE PASSWORD WITH PASSWORD

const changeKnownPasswordMutation = gql`
  mutation changeKnownPassword(
    $newPassword: String!
    $originalPassword: String!
  ) {
    changeKnownPassword(
      newPassword: $newPassword
      orginalPassword: $originalPassword
    ) {
      success
      action
      info
      message
    }
  }
`;

interface ChangeForgottenPasswordMutation {
  (): {
    validate: validateResultFunction;
    mutation: MutationTuple<
      { variables: { newPassword: string; originalPassword: string } },
      any
    >;
  };
}

export const useChangeKnownPasswordMutation: ChangeForgottenPasswordMutation = () => {
  return ActionResponseMutation(
    "changeKnownPassword",
    connectServerError("changePassword"),
    changeKnownPasswordMutation
  );
};

