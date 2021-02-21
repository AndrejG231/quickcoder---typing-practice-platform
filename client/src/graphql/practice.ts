import { useMutation, gql } from "@apollo/client";

const createPracticeMutation = gql`
  mutation createPractice(
    $practiceName: String!
    $clientParameter: String!
    $length: Int!
  ) {
    createPractice(
      practiceName: $practiceName
      clientParameter: $clientParameter
      length: $length
    ) {
      result {
        info
        action
        message
        success
      }
      practice {
        id
        string
        index
        errors_count
        errors
        time_spent
        is_finished
      }
    }
  }
`;

export const useCreatePracticeSession = () => {
  return useMutation(createPracticeMutation);
};
