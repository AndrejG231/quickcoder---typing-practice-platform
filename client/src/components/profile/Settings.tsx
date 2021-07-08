import React, { FC, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { ArrowButton, Form } from "..";

import {
  SettingsGrid,
  SettingsArea,
  SettingsNavigator,
  SectionSplitter,
  SectionTitle,
} from "./settings/";
import { inputData } from "../../types";
import { useErrors } from "../../utilites";

// Default form input type and values object for settings
const defaultData: { [key in string]: inputData } = {
  changeEmail: {
    "new email": { type: "email", value: "" },
    password: { type: "password", value: "" },
  },
  changeUsername: {
    "new username": { type: "text", value: "" },
    " password": { type: "password", value: "" },
  },
  changePassword: {
    "new password": { type: "password", value: "" },
    "repeat new password": { type: "password", value: "" },
    "previous password": { type: "password", value: "" },
  },
  deleteAccount: {
    "current password": { type: "password", value: "" },
  },
};

const Settings: FC = () => {
  // Inputs and input errors
  const [changeEmailData, setChangeEmailData] = useState(
    defaultData.changeEmail
  );
  const [changeUsernameData, setChangeUsernameData] = useState(
    defaultData.changeUsername
  );
  const [changePasswordData, setChangePasswordData] = useState(
    defaultData.changePassword
  );
  const [deleteAccountData, setDeleteAccountData] = useState(
    defaultData.deleteAccount
  );

  const [changeEmailErrors, setChangeEmailErrors] = useErrors();
  const [changeUsernameErrors, setChangeUsernameErrors] = useErrors();
  const [changePasswordErrors, setChangePasswordErrors] = useErrors();
  const [deleteAccountErrors, setDeleteAccountErrors] = useErrors();

  // Request handlers

  const handleChangeEmail = () => {};
  // Request => setEmailErros || setSuccessPopUp + refetch UserInfo

  const handleChangeUsername = () => null;
  // Request => setUsernameErrors || setSuccessPopUp + refetch UserInfo

  const handleChangePassword = () => null;
  // Request => setChangePasswordErrors || clear user info, GOTO login, setSuccessPopUP, ask for login

  const handleAccountDelete = () => null;

  const nav = useHistory();
  return (
    <SettingsGrid>
      {/* Navigation */}
      <SettingsNavigator>
        <ArrowButton
          width={220}
          onClick={() => nav.push("/profile/settings/")}
          right
        >
          Account
        </ArrowButton>
        <ArrowButton
          width={220}
          right
          onClick={() => nav.push("/profile/settings/practice_prefs/")}
        >
          Practice preferences
        </ArrowButton>
      </SettingsNavigator>
      <SettingsArea>
        {/* Account settings */}
        <Route exact path={"/profile/settings/"}>
          {/* Change username */}
          <SectionSplitter />
          <SectionTitle>Change username</SectionTitle>
          <Form
            page="change"
            data={changeUsernameData}
            setData={setChangeUsernameData}
            errors={changeUsernameErrors}
            submitFunction={handleChangeUsername}
            centered
          />
          {/* Change email */}
          <SectionSplitter />
          dle
          <SectionTitle>Change email</SectionTitle>
          <Form
            page="change"
            data={changeEmailData}
            setData={setChangeEmailData}
            errors={changeEmailErrors}
            submitFunction={handleChangeEmail}
            centered
          />
          {/* Change password */}
          <SectionSplitter />
          <SectionTitle>Change Password</SectionTitle>
          <Form
            page="change"
            data={changePasswordData}
            setData={setChangePasswordData}
            errors={changePasswordErrors}
            submitFunction={handleChangePassword}
            centered
          />
          {/* Delete account */}
          <SectionSplitter />
          <SectionTitle>Delete Account</SectionTitle>
          <Form
            page="delete"
            data={deleteAccountData}
            errors={deleteAccountErrors}
            setData={setDeleteAccountData}
            submitFunction={handleAccountDelete}
            centered
          />
        </Route>
        {/* Practice preferences */}
        <Route path={"/profile/settings/practice_prefs/"}>
          {/* Language */}
          {/* Prefered keyboard layout */}
          {/* Show finger indexes */}
          {/* Show keyboard visuals*/}
          {/* Keyboard visual size */}
          {/* Enable practice animations */}
        </Route>
      </SettingsArea>
    </SettingsGrid>
  );
};

export default Settings;
