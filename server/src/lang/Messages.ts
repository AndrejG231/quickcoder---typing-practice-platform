const Messages = {
  en: {
    ////////////////////
    //REGISTER ERRORS://
    ////////////////////
    register_username_specialCharacters:
      "Username can't contain any special characters",
    register_username_exists: "Username is already taken",
    register_email_invalid: "Enter valid email address",
    register_email_exists: "Email is already used",
    register_password_weak: "Your password is too weak",
    register_password_noInclude:
      "Your password must includ uppercase letter, lowercase letter and number",
    ////////////////
    //LOGIN ERRORS//
    ////////////////
    login_username_notFound: "Username does not exists",
    login_password_invalid: "Entered wrong password",
    ////////////////////
    //REGISTER SUCCESS//
    ////////////////////
    register_account_registered: "Successfully created an acount",
    /////////////////
    //LOGIN SUCCESS//
    /////////////////
    login_account_loggedIn: "Successfully logged in",
  },
};

export default Messages;
