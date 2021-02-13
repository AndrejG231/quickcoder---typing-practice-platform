import { ActionResponse } from "../types/auth";
import { DocumentNode, MutationTuple, useMutation } from "@apollo/client";

interface defaultError {
  (action: string): ActionResponse;
}

export const connectServerError: defaultError = (action) => {
  return {
    action: action,
    info: "unknown",
    message: "Couldn't connect to server.",
    success: false,
  };
};

interface isActionResTypes {
  (response: any): boolean;
}

const isActionResponse: isActionResTypes = (response) => {
  return (
    typeof response.info === "string" &&
    typeof response.action === "string" &&
    typeof response.message === "string" &&
    typeof response.success === "boolean"
  );
};

export interface validateResultFunction {
  (mutationResult: any): Promise<ActionResponse>;
}

interface getValidateResultsTypes {
  (defaultError: ActionResponse, field: string): validateResultFunction;
}

const getValidateResults: getValidateResultsTypes = (defaultError, field) => {
  return async (mutationResult) => {
    try {
      const result = await mutationResult;
      if (isActionResponse(result.data[field])) {
        return result.data[field];
      } else {
        return defaultError;
      }
    } catch (err) {
      console.log(err);
      return defaultError;
    }
  };
};

interface ActionResponseMutationTypes {
  (field: string, defaultError: ActionResponse, mutation: DocumentNode): {
    validate: validateResultFunction;
    mutation: MutationTuple<{ variables: any }, any>;
  };
}

export const ActionResponseMutation: ActionResponseMutationTypes = (
  field,
  defaultError,
  mutation
) => {
  return {
    validate: getValidateResults(defaultError, field),
    mutation: useMutation(mutation),
  };
};
