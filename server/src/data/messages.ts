const messages: { [message in string]: string } = {
  // REGISTER ERRORS //
  register_username_specialCharacters:
    "Username can't contain any special characters",
  register_username_length: "Username should be atleast 4 characters long",
  register_username_exists: "Username is already taken",
  register_email_invalid: "Enter valid email address",
  register_email_exists: "Email is already used",
  register_password_weak: "Your password is too weak",
  register_password_noInclude:
    "Your password must includ uppercase letter, lowercase letter and number",
  // LOGIN ERRORS //
  login_username_notFound: "Username does not exists",
  login_password_invalid: "Entered wrong password",
  // REGISTER SUCCESS //
  register_account_registered: "Successfully created an acount",
  // LOGIN SUCCESS //
  login_account_loggedIn: "Successfully logged in",
  // USER INFO QUERY //
  getUserInfo_cookies_notFound:
    "Could not retrieve cookies, please check your browser settings.",
  getUserInfo_token_notFound: "Could not retrieve login token. Please login",
  getUserInfo_token_outdated: "Session has expired. Please login",
  getUserInfo_user_notFound: "Could not find specified user. Please login",
  getUserInfo_user_wrongSession: "Invalid user data. Please login",
  // CHANGE PASSWORD //
  changePassword_user_notAuthenticated:
    "Not logged in or could not retrieve cookies",
  changePassword_password_changed: "Password changed successfully",
  changePassword_newPassword_weak: "Your password is too weak",
  changePassword_newPassword_noInclude:
    "Your password must includ uppercase letter, lowercase letter and number",
  // RETRIEVE PASSWORD //
  retrievePassword_email_notFound: "Could not find your email specified",
  retrievePassword_server_unknownError:
    "Unknow error occured. Please try again later",
  retrievePassword_resetLink_sent:
    "Password recovery link was sent to your email",
  retrievePassword_token_invalid: "Invalid token. Please try again",
  retrievePassword_token_expired: "Token expired. Please try again",
  // PRACTICE //
  getPracticesObject_practice_created: "Successfuly created practice session",
  getPracticesObject_practice_received:
    "Successfuly retrieved practice session",
  updatePracticeObject_practice_updated:
    "Successfuly updated practice session.",
  updatePracticeObject_practice_failed: "Failed to update practice session",
  practiceStats_stats_retrieved: "Successfully received users practice stats",
  clearUnfinishedPractices_practices_cleared:
    "Successfuly cleared unfinished practices",
  clearUnfinishedPractices_practices_failed:
    "Failed to clear unfinished practices",
  // PROFILE STATS //
  profile_overview_retrieved: "Successfully retrieved users profile overview",
  profile_history_retrieved: "Successfully retrieved users profile history",
  unfinishedPractices_profile_retrieved:
    "Successfully retrieved unfinished practices",
};

export default messages;
