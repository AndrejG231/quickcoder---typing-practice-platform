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
  //CHANGE PASSWORD
  | "changePassword_user_notAuthenticated";

export default keyList;
