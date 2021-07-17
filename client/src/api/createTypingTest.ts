import { api } from "../static";
import { practiceObject } from "../types/";

const createTypingTestMutation = `
mutation createTypingTest {
  createTypingTest {
    result {
      success
      info
      message
    }
    practice {
      id
      category
      string
      index
      practice_index
      errors
      time_spent
      is_finished
    }
  }
}
`;

type createTypingTestOptions = {
  onSuccess: (practice: practiceObject) => void;
  onError: () => void;
};

const createTypingTest = async ({
  onSuccess,
  onError,
}: createTypingTestOptions) => {
  try {
    const data = await api.post("", {
      query: createTypingTestMutation,
    });

    const result = data.data?.data?.createTypingTest;

    if (result?.result?.success) {
      onSuccess({
        ...result.practice,
        errors: JSON.parse(result.practice.errors),
      });
    } else {
      onError();
    }
  } catch (error) {
    onError();
  }
};

export default createTypingTest;
