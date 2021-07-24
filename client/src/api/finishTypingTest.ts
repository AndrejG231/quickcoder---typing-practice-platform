import { api } from "../static";
import { actionResponse, finishedTestStats } from "../types";

const finishTypingTestMutation = `
mutation finishTypingTest(
  $practiceId: Int!
  $practiceUpdateFields: PracticeUpdateFields!
) {
  finishTypingTest(
    practiceUpdateFields: $practiceUpdateFields
    practiceId: $practiceId
  ) {
    stats {
      score
      cpm
      errorRate
      timeSpent
      betterThan
      errors
    }
    result {
      success
      info
      message
    }
  }
}
`;

type updatePracticeOptions = {
  practiceUpdateFields: {
    index?: number;
    errors?: string;
    time_spent?: number;
  };
  practiceId: number;
  onSuccess: (data: finishedTestStats) => void;
  onError: (message?: string) => void;
};

const finishTypingTest = async ({
  practiceUpdateFields,
  practiceId,
  onSuccess,
  onError,
}: updatePracticeOptions) => {
  try {
    const data = await api.post("", {
      query: finishTypingTestMutation,
      variables: { practiceUpdateFields, practiceId },
    });

    console.log(data);

    const result: { stats: finishedTestStats; result: actionResponse } =
      data.data?.data?.finishTypingTest;

    console.log(result);
    if (result?.result?.success && result?.stats) {
      onSuccess(result.stats);
    }
    onError();
  } catch (error) {
    onError();
  }
};

export default finishTypingTest;
