import React, { FC, useState } from "react";
import { Route, useHistory } from "react-router";
import { ArrowButton } from "..";

import {
  SettingsGrid,
  SettingsArea,
  SettingsNavigator,
  SectionSplitter,
  SectionTitle,
} from "./settings/";
import { Form } from "../";
import { inputData } from "../../types";
import { useErrors } from "../../utilites";

const Settings: FC = () => {
  const [changeEmailData, setChangeEmailData] = useState<inputData>({
    "new email": { type: "email", value: "" },
    password: { type: "password", value: "" },
  })
  const [changeEmailErrors, setChangeEmailErrors] = useErrors()
  const [changeUsernameData, setChangeUsernameData] = useState<inputData>({
    "new username": { type: "text", value: "" },
    " password": { type: "password", value: "" },
  });
  const [changePasswordData, setChangePasswordData] = useState<inputData>({
    "new password": { type: "password", value: "" },
    "repeat new password": { type: "password", value: "" },
    "previous password": { type: "password", value: "" },
  });
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
            errors={{ field: "", value: "" }}
            submitFunction={console.log}
            centered
          />
          {/* Change email */}
          <SectionSplitter />
          <SectionTitle>Change email</SectionTitle>
          <Form
            page="change"
            data={changeEmailData}
            setData={setChangeEmailData}
            errors={{ field: "", value: "" }}
            submitFunction={console.log}
            centered
          />
          {/* Change password */}
          <SectionSplitter />
          <SectionTitle>Change Password</SectionTitle>
          <Form
            page="change"
            data={changePasswordData}
            setData={setChangePasswordData}
            errors={{ field: "", value: "" }}
            submitFunction={console.log}
            centered
          />
          {/* Delete account */}
        </Route>
        {/* Practice preferences */}
        <Route path={"/profile/settings/practice_prefs/"}>
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
