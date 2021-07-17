import { api } from "../static";
import { actionResponse } from "../types";

const deleteAllUnfinishedMutation = `
  mutation removeAllUnfinishedPractices {
    removeAllUnfinished {
      success
      message
      info
    }
  }
`;

type deleteAllUnfinishedOptions = {
  onSuccess: () => void;
  onError: (message: string) => void;
};

const deletePractice = async ({
  onSuccess,
  onError,
}: deleteAllUnfinishedOptions) => {
  try {
    const queryResult = await api.post("", {
      query: deleteAllUnfinishedMutation,
    });

    const result: actionResponse = queryResult.data?.data?.removeAllUnfinished;


    if (result?.success) {
      return onSuccess();
    }

    onError(result.message);
  } catch (error) {
    onError(error);
  }
};

export default deletePractice;
