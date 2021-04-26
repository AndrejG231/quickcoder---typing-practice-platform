import { DocumentNode, gql, useMutation, useQuery } from "@apollo/client";

// //Utilities
// import getClientParam from "../utilites/clientParameter";

// //REGISTER


// //RETRIEVE PASSWORD TOKEN

// const retrievePasswordMutation = gql`
//   mutation retrievePasswordToken($clientInfo: String!, $email: String!) {
//     retrievePasswordToken(clientInfo: $clientInfo, email: $email) {
//       action
//       info
//       message
//       success
//     }
//   }
// `;

// export const useRetrievePasswordMutation: RetrievePasswordMutation = () => {
//   return ActionResponseMutation(
//     "retrievePasswordToken",
//     connectServerError("retrievePassword"),
//     retrievePasswordMutation
//   );
// };

// //CHANGE PASSWORD WITH TOKEN

// const changeForgottenPasswordMutation = gql`
//   mutation changeForgottenPassword($newPassword: String!, $token: String!) {
//     changeForgottenPassword(newPassword: $newPassword, token: $token) {
//       success
//       action
//       info
//       message
//     }
//   }
// `;

// export const useChangeForgottenPasswordMutation: ChangeForgottenPasswordMutation = () => {
//   return ActionResponseMutation(
//     "changeForgottenPassword",
//     connectServerError("retrievePassword"),
//     changeForgottenPasswordMutation
//   );
// };

// //CHANGE PASSWORD WITH PASSWORD

// const changeKnownPasswordMutation = gql`
//   mutation changeKnownPassword(
//     $newPassword: String!
//     $originalPassword: String!
//   ) {
//     changeKnownPassword(
//       newPassword: $newPassword
//       orginalPassword: $originalPassword
//     ) {
//       success
//       action
//       info
//       message
//     }
//   }
// `;

// export const useChangeKnownPasswordMutation: ChangeForgottenPasswordMutation = () => {
//   return ActionResponseMutation(
//     "changeKnownPassword",
//     connectServerError("changePassword"),
//     changeKnownPasswordMutation
//   );
// };

// //GetUserInfo

// export const GetUserInfo = () => {
//   return useQuery(userInfoQuery, {
//     variables: { clientParameter: getClientParam() },
//   });
// };

// const logoutMutation = gql`
//   mutation {
//     logout
//   }
// `;

// export const Logout = () => {
//   return useMutation(logoutMutation);
// };
