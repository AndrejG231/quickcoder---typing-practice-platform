import { api } from "../static";
import { actionResponse, unfinishedPractice } from "../types";

const unfinishedPracticesQuery = `
query getUnfinishedPractices {
  getUnfinishedPractices {
    result {
      success
      message
      info
    }
    practices {
      created_at
      id
      category
      practice_index
      length
      completion
    }
  }
}
`;

type unfinishedPracticeOptions = {
  onSuccess: (practices: unfinishedPractice[]) => void;
  onError: () => void;
};

const getUnfinishedPractices = async ({
  onSuccess,
  onError,
}: unfinishedPracticeOptions) => {
  try {
    const queryResult = await api.post("", {
      query: unfinishedPracticesQuery,
    });

    const {
      result,
      practices,
    }: { result: actionResponse; practices: unfinishedPractice[] } =
      queryResult.data?.data?.getUnfinishedPractices;

    if (result?.success) {
      return onSuccess(practices?.length ? practices : []);
    }

    onError();
  } catch (error) {
    console.log(error);
    onError();
  }
};

export default getUnfinishedPractices;
