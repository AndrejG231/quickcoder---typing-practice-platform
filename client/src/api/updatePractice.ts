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
    errors_count?: number;
    errors?: string;
    is_finished?: boolean;
    time_spent?: number;
  };
  id: number;
};

const updatePractice = async ({
  practiceUpdateFields,
  id,
}: updatePracticeOptions) => {
  try {
    const data = await api.post("", {
      query: updatePracticeQuery,
      variables: { practiceUpdateFields, id },
    });

    const result = data.data.data.updatePractice;

    if (!result?.result?.success) {
      console.log("Failed to update current practice sessoin.");
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export default updatePractice;
