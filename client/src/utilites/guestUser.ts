import { UserInfo } from "../types/graphql/AuthMutationsT";

const guestUser: UserInfo = {
  id: -1,
  username: "GUEST",
  email: "Not Logged In",
  language: "en",
  keyboard_layout: "US",
  color_scheme: "dark",
  created_at: "0",
};

export default guestUser;
