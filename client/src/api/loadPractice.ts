import { api } from "../static";
import { practiceObject } from "../types/";

const loadPracticeQuery = `
  query getPractice($id: Int!) {
    getPractice(id: $id) {
      result {
        success
        info
        message
      }

      practice {
        id
        category
        practice_index
        string
        index
        errors
        time_spent
        is_finished
        user_id
      }
    }
  }
`;

type loadPracticeOptions = {
  id: number;
  onSuccess: (practice: practiceObject) => void;
  onError: () => void;
};

const loadPractice = async ({
  id,
  onSuccess,
  onError,
}: loadPracticeOptions) => {
  try {
    const data = await api.post("", {
      query: loadPracticeQuery,
      variables: { id },
    });

    const result = data.data.data.getPractice;

    console.log(result);

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

export default loadPractice;
