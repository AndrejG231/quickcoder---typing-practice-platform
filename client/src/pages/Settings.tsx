import React, { FC, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { ArrowButton, Form } from "../components";

import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";

import {
  SettingsGrid,
  SettingsArea,
  SettingsNavigator,
  SectionSplitter,
  SectionTitle,
} from "../components/settings";
import { setGlobalMessage, toggleAuthRefresh } from "../redux/actions";
import { routes } from "../static";
import { inputData } from "../types";
import { useErrors } from "../utilites";
import {
  changeEmail,
  changeUsername,
  changePassword,
  deleteAccount,
} from "../api";

// Default form input type and values object for settings
const defaultData: { [key in string]: inputData } = {
  changeEmail: {
    "new email": { type: "email", value: "" },
    password: { type: "password", value: "" },
  },
  changeUsername: {
    "new username": { type: "text", value: "" },
    password: { type: "password", value: "" },
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

const defaultError = { field: "", value: "" };

// Redux setup
const rdxState = () => ({});

const rdxDispatch = (dispatch: Dispatch) => ({
  refreshAuth: () => dispatch(toggleAuthRefresh(true)),
  popUp: (message: string) => dispatch(setGlobalMessage(message)),
});

const withRedux = connect(rdxState, rdxDispatch);

//

type props = ConnectedProps<typeof withRedux>;

const Settings: FC<props> = ({ refreshAuth, popUp }) => {
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

  const handleChangeUsername = () => {
    changeUsername({
      onSuccess: () => {
        refreshAuth();
        popUp("Successfully changed username");
        setChangeUsernameData(defaultData.changeUsername);
        setChangeUsernameErrors(defaultError);
      },
      setErrors: setChangeUsernameErrors,
      credentials: {
        newUsername: changeUsernameData["new username"].value,
        password: changeUsernameData.password.value,
      },
    });
  };

  const handleChangeEmail = () => {
    changeEmail({
      onSuccess: () => {
        refreshAuth();
        popUp("Successfully changed email");
        setChangeEmailData(defaultData.changeEmail);
        setChangeEmailErrors(defaultError);
      },
      setErrors: setChangeEmailErrors,
      credentials: {
        newEmail: changeEmailData["new email"].value,
        password: changeEmailData.password.value,
      },
    });
  };

  const handleChangePassword = () => {
    // Client side checking wheter password match
    const originalPassword = changePasswordData["previous password"].value;
    const newPassword = changePasswordData["new password"].value;
    const newPasswordRepeated = changePasswordData["repeat new password"].value;

    return newPassword === newPasswordRepeated
      ? changePassword({
          onSuccess: () => {
            refreshAuth();
            nav.push(routes.login);
            popUp("Successfully changed password, please login.");
          },
          setErrors: setChangePasswordErrors,
          credentials: { newPassword, originalPassword },
        })
      : setChangePasswordErrors({
          field: "repeat new password",
          value: "Passwords do not match.",
        });
    // OnSuccess => logout and ask for login with new password,
  };

  const handleAccountDelete = () => {
    deleteAccount({
      onSuccess: () => {
        refreshAuth();
        nav.push(routes.home);
        popUp("Successfully deleted account.");
      },
      setErrors: setDeleteAccountErrors,
      password: deleteAccountData["current password"].value,
    });
    // OnSuccess => logout ad go to home page
  };

  const nav = useHistory();
  return (
    <SettingsGrid>
      {/* Navigation */}
      <SettingsNavigator>
        <ArrowButton
          width={220}
          onClick={() => nav.push(routes.settings)}
          right
        >
          Account
        </ArrowButton>
        <ArrowButton
          width={220}
          right
          onClick={() => nav.push(routes.practicePreferences)}
        >
          Practice preferences
        </ArrowButton>
        <ArrowButton width={220} right onClick={() => nav.push(routes.home)}>
          Home
        </ArrowButton>
      </SettingsNavigator>
      <SettingsArea>
        {/* Account settings */}
        <Route exact path={routes.settings}>
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
        <Route path={routes.practicePreferences}>
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

export default withRedux(Settings);
