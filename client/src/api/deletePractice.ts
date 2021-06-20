import { api } from "../static";
import { actionResponse } from "../types";

const deletePracticeMutation = `
  mutation deletePractice($id:Int!){
    deletePractice(practiceId:$id){
      success
      info
      message
    }
  }
`;

type deletePracticeOptions = {
  id: number;
  onSuccess: () => void;
  onError: (message: string) => void;
};

const deletePractice = async ({
  id,
  onSuccess,
  onError,
}: deletePracticeOptions) => {
  try {
    const queryResult = await api.post("", {
      query: deletePracticeMutation,
      variables: { id },
    });

    const result: actionResponse = queryResult.data?.data?.deletePractice;

    if (result?.success) {
      return onSuccess();
    }

    onError(result.message);
  } catch (error) {
    onError(error);
  }
};

export default deletePractice;
