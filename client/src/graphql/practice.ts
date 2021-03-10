import { useMutation, gql, useQuery } from "@apollo/client";
import { ActionResponseMutation, connectServerError } from "./general";

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

export const practiceMenuQuery = gql`
  query getItem($index: Int!) {
    getItem(index: $index) {
      hasMore
      item {
        type
        name
        description
        overview
        category
      }
      error
    }
  }
`;

export const practiceStatsQuery = gql`
  query getPracticeStats($practiceName: String!) {
    getPracticeStats(practiceName: $practiceName) {
      stats {
        score
        length
        cpm
        error_rate
      }
      response {
        success
        action
        info
        message
      }
    }
  }
`;

export const userStatsQuery = gql`
  query getUserStats {
    getUserStats {
      stats {
        score
        length
        name
        cpm
        error_rate
      }
      response {
        success
        action
        info
        message
      }
    }
  }
`;

const updatePracticeMutation = gql`
  mutation UpdatePractice(
    $practiceId: Int!
    $practiceUpdateFields: PracticeUpdateFields!
  ) {
    updatePractice(
      practiceUpdateFields: $practiceUpdateFields
      practiceId: $practiceId
    ) {
      action
      success
      info
      message
    }
  }
`;

export const getPracticeResultsQuery = gql`
  query getPracticeResults($id: Int!) {
    getPracticeResult(id: $id) {
      result {
        success
        action
        info
        message
      }
      practice {
        practice_name
        string
        errors
        errors_count
        index
        time_spent
        user_id
        created_at
      }
    }
  }
`;

export const useCreatePracticeSession = () => {
  return useMutation(createPracticeMutation);
};

export const useUpdatePracticeMutation = () => {
  return ActionResponseMutation(
    "updatePractice",
    connectServerError("updatePractice"),
    updatePracticeMutation
  );
};
