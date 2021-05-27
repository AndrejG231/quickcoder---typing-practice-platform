import { api } from "../static";
import { practiceObject } from "../types/";

const createPracticeMutation = `
  mutation createPractice($length:Int!, $category:String!, $index:Int!){
    createPractice(length:$length, category:$category, index:$index){
      result{
        success
        info
        message
      }
      practice{
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

type createPracticeOptions = {
  category: string;
  index: number;
  length: number;
  onSuccess: (practice: practiceObject) => void;
  onError: () => void;
};

const createPractice = async ({
  category,
  index,
  length,
  onSuccess,
  onError,
}: createPracticeOptions) => {
  try {
    console.log(category, index, length);
    const data = await api.post("", {
      query: createPracticeMutation,
      variables: { category, index, length },
    });

    const result = data.data?.data?.createPractice;

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

export default createPractice;
