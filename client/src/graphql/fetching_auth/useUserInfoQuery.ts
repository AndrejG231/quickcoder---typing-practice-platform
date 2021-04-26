import { gql, useLazyQuery } from "@apollo/client";
import { userInfo } from "../../types";
import getClientParam from "../../utilites/clientParameter";
import clientParameter from "../../utilites/clientParameter";

const userInfoQuery = gql`
  query getSignedUser($clientParameter: String!) {
    getSignedUser(clientParameter: $clientParameter) {
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
  data: {
    getSignedUser: {
      user: userInfo;
      error: {};
    };
  };
};

type UserInfoQuery = {
  (): [() => void];
};

const useUserInfoQuery = () => {
  return useLazyQuery(userInfoQuery, {
    variables: { clientParameter: getClientParam() },
  });
};

export default useUserInfoQuery;
