import { api } from "../static";

const updatePracticeQuery = `mutation updatePractice(
  $practiceUpdateFields: PracticeUpdateFields!
  $practiceId: Int!
) {
  updatePractice(
    practiceUpdateFields: $practiceUpdateFields
    practiceId: $practiceId
  ) {
    success
    info
    message
  }
}`;

type updatePracticeOptions = {
  practiceUpdateFields: {
    index?: number;
    errors?: string;
    is_finished?: boolean;
    time_spent?: number;
  };
  practiceId: number;
};

const updatePractice = async ({
  practiceUpdateFields,
  practiceId,
}: updatePracticeOptions) => {
  try {
    const data = await api.post("", {
      query: updatePracticeQuery,
      variables: { practiceUpdateFields, practiceId },
    });

    const result = data.data.data.updatePractice;

    if (!result?.success) {
      // TODO: handle error
    }
  } catch (error) {
    // handle error
  }
};

export default updatePractice;
