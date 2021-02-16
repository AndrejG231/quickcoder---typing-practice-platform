import { MutationTuple } from "@apollo/client";
import { ResponseValidator } from "./ActResMutationsT";

export type UserInfo = {
  id: number;
  username: string;
  email: string;
  language: string;
  keyboard_layout: string;
  color_scheme: string;
  created_at: string;
};

export type LoginCredentials = {
  identification: string;
  password: string;
};

export type LoginMutation = {
  (): {
    validate: ResponseValidator;
    mutation: MutationTuple<
      { variables: { credentials: LoginCredentials; clientParameter: string } },
      any
    >;
  };
};

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

export type RegisterMutation = {
  (): {
    validate: ResponseValidator;
    mutation: MutationTuple<
      { variables: { credentials: RegisterCredentials } },
      any
    >;
  };
};

export type ChangeKnownPasswordVariables = {
  originalPassword: string;
  newPassword: string;
};

export type RetrievePasswordMutation = {
  (): {
    validate: ResponseValidator;
    mutation: MutationTuple<
      { variables: { email: string; clientInfo: string } },
      any
    >;
  };
};

export type ChangeForgottenPasswordMutation = {
  (): {
    validate: ResponseValidator;
    mutation: MutationTuple<
      { variables: { newPassword: string; token: string } },
      any
    >;
  };
};
