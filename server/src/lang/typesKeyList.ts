type keyList =
  //REGISTER ERRORS:
  | "register_username_specialCharacters"
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

export default keyList;
