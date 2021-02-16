import { useMutation } from "@apollo/client";

import {
  defaultError,
  ResponseTypeValidator,
  ResponseValidatorGetter,
  ActionResponseMutationProvider,
} from "../types/graphql/ActResMutationsT";

export const connectServerError: defaultError = (action) => {
  return {
    action: action,
    info: "unknown",
    message: "Couldn't connect to server.",
    success: false,
  };
};

const isActionResponse: ResponseTypeValidator = (response) => {
  return (
    typeof response.info === "string" &&
    typeof response.action === "string" &&
    typeof response.message === "string" &&
    typeof response.success === "boolean"
  );
};

// const isUserResponse: ResponseTypeValidator = (response) => {
//   return (
//     typeof response.id === "number" &&
//     typeof response.username === "string" &&
//     typeof response.email === "string" &&
//     typeof response.language === "string" &&
//     typeof response.keyboard_layout === "string" &&
//     typeof response.color_scheme === "string" &&
//     typeof response.created_at === "string"
//   );
// };

const getValidateResults: ResponseValidatorGetter = (defaultError, field) => {
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

export const ActionResponseMutation: ActionResponseMutationProvider = (
  field,
  defaultError,
  mutation
) => {
  return {
    validate: getValidateResults(defaultError, field),
    mutation: useMutation(mutation),
  };
};
