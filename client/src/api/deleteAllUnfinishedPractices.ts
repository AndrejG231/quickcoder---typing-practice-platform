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

    console.log("DELETE ALL RESULT\n");
    console.log(result);

    if (result?.success) {
      console.log("SUCCESS");
      return onSuccess();
    }

    onError(result.message);
  } catch (error) {
    onError(error);
  }
};

export default deletePractice;
