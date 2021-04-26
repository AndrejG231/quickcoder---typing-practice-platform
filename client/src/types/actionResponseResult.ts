import { actionResponse } from "./";

type actionResponseResult = {
  data?: {
    register: actionResponse;
  } | null;

  fetching?: boolean;
  error?: any;
};

export default actionResponseResult;
