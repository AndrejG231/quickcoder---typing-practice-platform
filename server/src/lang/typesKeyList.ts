type keyList =
  | "register_username_specialCharacters"
  | "register_username_exists"
  | "register_email_invalid"
  | "register_email_exists"
  | "register_password_weak"
  | "register_password_noInclude"
  | "login_username_notFound"
  | "login_password_invalid";

export default keyList;
