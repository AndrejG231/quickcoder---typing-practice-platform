type keyList =
  //REGISTER ERRORS:
  | "register_username_specialCharacters"
  | "register_username_length"
  | "register_username_exists"
  | "register_email_invalid"
  | "register_email_exists"
  | "register_password_weak"
  | "register_password_noInclude"
  //LOGIN ERRORS:
  | "login_username_notFound"
  | "login_password_invalid"
  //REGISTER SUCCESSES
  | "register_account_registered"
  //LOGIN SUCCESSES
  | "login_account_loggedIn"
  //USER INFO QUERY
  | "getUserInfo_cookies_notFound"
  | "getUserInfo_token_notFound"
  | "getUserInfo_token_outdated"
  | "getUserInfo_clientParameter_invalid"
  | "getUserInfo_user_notFound"
  | "getUserInfo_user_wrongSession"
  //CHANGE PASSWORD
  | "changePassword_user_notAuthenticated"
  | "changePassword_password_changed"
  | "changePassword_newPassword_weak"
  | "changePassword_newPassword_noInclude"
  //RETRIEVE PASSWORD
  | "retrievePassword_email_notFound"
  | "retrievePassword_server_unknownError"
  | "retrievePassword_resetLink_sent"
  |"retrievePassword_token_invalid"
  |"retrievePassword_token_expired"
export default keyList;
