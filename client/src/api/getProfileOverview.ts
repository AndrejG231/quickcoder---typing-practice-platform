import { api } from "../static";
import { actionResponse, userProfileOverview } from "../types";

const getProfileOverviewQuery = `
query getProfileOverview {
  getProfileOverview {
    averageStats {
      averageScore
      averageCpm
      averageErrorsRate
      totalLength
      finishedTimeSpent
    }
    lastPractices {
      score
      error_rate
      cpm
      category
      practice_index
      length
    }
    result {
      success
      info
      message
    }
  }
}
`;

type getProfileOverviewOptions = {
  onSuccess: (overview: userProfileOverview) => void;
  onError: () => void;
};

const getProfileOverview = async ({
  onSuccess,
  onError,
}: getProfileOverviewOptions) => {
  try {
    const queryResult = await api.post("", {
      query: getProfileOverviewQuery,
    });

    const data: userProfileOverview & { result: actionResponse } =
      queryResult.data.data?.getProfileOverview;

    if (!data) {
      return onError();
    }

    const { averageStats, lastPractices, result } = data;

    if (
      typeof averageStats?.averageCpm === "number" &&
      typeof averageStats?.averageErrorsRate === "number" &&
      typeof averageStats?.averageScore === "number" &&
      typeof averageStats?.finishedTimeSpent === "number" &&
      typeof averageStats?.totalLength === "number" &&
      lastPractices.length > 0 &&
      result.success === true
    ) {
      return onSuccess({ averageStats, lastPractices });
    }

    console.log(result);
    onError();
  } catch (error) {
    console.log(error);
    onError();
  }
};

export default getProfileOverview;
