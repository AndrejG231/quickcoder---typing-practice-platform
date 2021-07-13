import React, { FC, useState, useCallback, RefObject, useRef } from "react";
import { Route, useHistory } from "react-router-dom";
import { ArrowButton, Form, NavBar } from "../components";

import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";

import {
  SettingsGrid,
  SettingsArea,
  SettingsNavigator,
  SectionSplitter,
  SectionTitle,
  NavParameter,
  SettingRow,
  SettingLabel,
  BoxInput,
} from "../components/settings";
import {
  setGlobalMessage,
  setUserInfo,
  toggleAuthRefresh,
} from "../redux/actions";
import { routes } from "../static";
import { inputData, reduxStore, userInfo } from "../types";
import { useErrors } from "../utilites";
import {
  changeEmail,
  changeUsername,
  changePassword,
  deleteAccount,
  changeUserPreference,
} from "../api";
import { SchemeSelection } from "../components/practice_menu/practice_settings";

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
const rdxState = (state: reduxStore) => ({
  user: state.authentication.user,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  refreshAuth: () => dispatch(toggleAuthRefresh(true)),
  popUp: (message: string) => dispatch(setGlobalMessage(message)),
  setUserInfo: (user: userInfo) => dispatch(setUserInfo(user)),
});

const withRedux = connect(rdxState, rdxDispatch);

//

type props = ConnectedProps<typeof withRedux>;

const Settings: FC<props> = ({ refreshAuth, popUp, user, setUserInfo }) => {
  const nav = useHistory();

  // Settings section references
  const changeUsernameRef = useRef() as RefObject<HTMLDivElement>;
  const changeEmailRef = useRef() as RefObject<HTMLDivElement>;
  const changePasswordRef = useRef() as RefObject<HTMLDivElement>;
  const deleteAccountRef = useRef() as RefObject<HTMLDivElement>;

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

  // End of input values and errors

  // Request handlers

  const handleChangeUsername = useCallback(() => {
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
  }, [changeUsernameData]);

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

  // End of request handlers

  // Other handlers

  // When using settings navigation, provides rerouting before scrolling
  const scrollHref = async (
    type: "acc" | "pref",
    to?: RefObject<HTMLDivElement>
  ) => {
    const pathname =
      type === "acc" ? routes.settings : routes.practicePreferences;

    if (nav.location.pathname !== pathname) {
      nav.push(pathname);
    }

    setTimeout(() => {
      if (to?.current) {
        const par: any = to.current.parentNode;
        par.scrollTop = to.current.offsetTop - 60;
      }
    }, 25);
  };

  // Updating state to prevent multiple clicks spamming
  const [updating, setUpdating] = useState(false);

  // On practice preference change - handle change and server update
  const togglePref = (pref: keyof userInfo) => {
    if (!updating && user) {
      changeUserPreference({
        onSuccess: () => {
          setUserInfo({ ...user, [pref]: !user[pref] });
          setUpdating(false);
        },
        onError: () => setGlobalMessage("Failed to update preference."),
        field: pref,
        value: !user[pref],
      });
    }
  };

  return (
    <SettingsGrid>
      {/* Navigation */}
      <Route exact path={routes.settings}>
        <NavBar>
          <ArrowButton
            width={220}
            onClick={() => nav.push(routes.settings)}
            selected
          >
            Account
          </ArrowButton>
          <ArrowButton
            width={220}
            onClick={() => nav.push(routes.practicePreferences)}
          >
            Practice preferences
          </ArrowButton>
          <ArrowButton width={220} onClick={() => nav.push(routes.home)}>
            Home
          </ArrowButton>
        </NavBar>
        <SettingsNavigator>
          <NavParameter onClick={() => scrollHref("acc", changeUsernameRef)}>
            Change Username
          </NavParameter>
          <NavParameter onClick={() => scrollHref("acc", changeEmailRef)}>
            Change Email
          </NavParameter>
          <NavParameter onClick={() => scrollHref("acc", changePasswordRef)}>
            Change Password
          </NavParameter>
          <NavParameter onClick={() => scrollHref("acc", deleteAccountRef)}>
            Delete Account
          </NavParameter>
        </SettingsNavigator>
        <SettingsArea>
          {/* Account settings */}
          {/* Change username */}
          <SectionSplitter ref={changeUsernameRef} />
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
          <SectionSplitter ref={changeEmailRef} />
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
          <SectionSplitter ref={changePasswordRef} />
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
          <SectionSplitter ref={deleteAccountRef} />
          <SectionTitle>Delete Account</SectionTitle>
          <Form
            page="delete"
            data={deleteAccountData}
            errors={deleteAccountErrors}
            setData={setDeleteAccountData}
            submitFunction={handleAccountDelete}
            centered
          />
        </SettingsArea>
      </Route>
      <Route path={routes.practicePreferences}>
        <NavBar>
          <ArrowButton width={220} onClick={() => nav.push(routes.settings)}>
            Account
          </ArrowButton>
          <ArrowButton
            width={220}
            onClick={() => nav.push(routes.practicePreferences)}
            selected
          >
            Practice preferences
          </ArrowButton>
          <ArrowButton width={220} onClick={() => nav.push(routes.home)}>
            Home
          </ArrowButton>
        </NavBar>
        <SettingsNavigator>
          <NavParameter onClick={() => scrollHref("pref")}>
            Keyboard layout
          </NavParameter>
          <NavParameter onClick={() => scrollHref("pref")}>
            Language
          </NavParameter>
          <NavParameter onClick={() => scrollHref("pref")}>
            Display options
          </NavParameter>
        </SettingsNavigator>
        <SettingsArea>
          {/* Practice preferences */}
          {/* Keyboard layout */}
          <SettingRow>
            <SettingLabel>Keyboard layout:</SettingLabel>
            <SchemeSelection name="scheme" defaultValue="en-us">
              <option value="en-us"> EN - US </option>
            </SchemeSelection>
          </SettingRow>
          {/* Language */}
          <SettingRow>
            <SettingLabel>Language:</SettingLabel>
            <SchemeSelection name="scheme" defaultValue="en">
              <option value="en">English</option>
            </SchemeSelection>
          </SettingRow>
          <SettingRow>
            <SectionTitle>Display options</SectionTitle>
          </SettingRow>
          {/* Show finger indexes */}
          <SettingRow>
            <SettingLabel>Display finger indexes:</SettingLabel>
            <BoxInput
              checked={user?.keyboard_indexes}
              onChange={() => togglePref("keyboard_indexes")}
            />
          </SettingRow>
          {/* Show keyboard visuals*/}
          <SettingRow>
            <SettingLabel>Display keyboard visuals:</SettingLabel>
            <BoxInput
              checked={user?.keyboard_visuals}
              onChange={() => togglePref("keyboard_visuals")}
            />
          </SettingRow>
          {/* Enable practice animations */}
          <SettingRow>
            <SettingLabel>Enable practice animations</SettingLabel>
            <BoxInput
              checked={user?.animations}
              onChange={() => togglePref("animations")}
            />
          </SettingRow>
        </SettingsArea>
      </Route>
    </SettingsGrid>
  );
};

export default withRedux(Settings);
