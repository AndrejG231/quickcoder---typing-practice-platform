import { api } from "../static";
import { actionResponse, userPracticeHistory } from "../types";

const getProfileHistoryQuery = `
query getProfileHistory($lastDate: DateTime) {
  getProfileHistory(lastDate: $lastDate) {
    lastPractices {
      score
      error_rate
      cpm
      length
      category
      practice_index
      id
      created_at
    }
    result {
      success
      message
      info
    }
  }
}
`;

type getProfileHistoryOptions = {
  type: "update" | "load";
  lastDate?: Date;
  onSuccess: (type: "update" | "load", history: userPracticeHistory) => void;
  onError: () => void;
};

const getProfileOverview = async ({
  type,
  onSuccess,
  onError,
  lastDate,
}: getProfileHistoryOptions) => {
  try {
    const queryResult = await api.post("", {
      query: getProfileHistoryQuery,
      variables: lastDate ? { lastDate } : {},
    });

    const data: userPracticeHistory & { result: actionResponse } =
      queryResult.data.data?.getProfileHistory;

    if (!data) {
      return onError();
    }

    const { lastPractices, result } = data;

    if (lastPractices.length > 0 && result.success === true) {
      return onSuccess(type, { lastPractices });
    }

    onError();
  } catch (error) {
    console.log(error);
    onError();
  }
};

export default getProfileOverview;
