import { DocumentNode, MutationTuple } from "@apollo/client";

export type ActionResponse = {
  success: boolean;
  info: string;
  message: string;
  action: string;
};

export type defaultError = {
  (action: string): ActionResponse;
};

export type ResponseTypeValidator = {
  (response: any): boolean;
};

export type ResponseValidator = {
  (mutationResult: any): Promise<ActionResponse>;
};

export type ResponseValidatorGetter = {
  (defaultError: ActionResponse, field: string): ResponseValidator;
};

export type ActionResponseMutationProvider = {
  (field: string, defaultError: ActionResponse, mutation: DocumentNode): {
    validate: ResponseValidator;
    mutation: MutationTuple<{ variables: any }, any>;
  };
};
