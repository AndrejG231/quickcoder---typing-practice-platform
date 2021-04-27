import { gql, useQuery } from "@apollo/client";
import { actionResponse, userInfo } from "../../types";

export const userInfoQuery = gql`
  query getSignedUser {
    getSignedUser {
      user {
        id
        username
        email
        language
        keyboard_layout
        color_scheme
        created_at
      }
      error {
        action
        success
        message
        info
      }
    }
  }
`;

type QueryResult = {
  data?: {
    getSignedUser: {
      user?: userInfo;
      error?: actionResponse;
    };
  };
  error?: any;
  fetching?: boolean;
  refetch: () => void;
};

type UserInfoQuery = {
  (): QueryResult;
};

const useUserInfoQuery: UserInfoQuery = () => {
  return useQuery(userInfoQuery);
};

export default useUserInfoQuery;
