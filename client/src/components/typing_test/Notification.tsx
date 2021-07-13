import React, { FC } from "react";
import { useHistory } from "react-router";

import {
  NotifyContainer,
  NotifyTitle,
  ButtonsRow,
  NotifyButton,
  NotifyText,
} from "./";
import { routes } from "../../static";

interface props {
  auth: boolean;
  acceptClick: () => void;
}

const Notification: FC<props> = ({ auth, acceptClick }) => {
  const nav = useHistory();
  return (
    <NotifyContainer>
      <NotifyTitle />
      <NotifyText>
        {auth ? (
          <>
            You are going to start test session, that can take over 5 minutes of
            constant typing, can't be paused or restarted.
            <br />
            <br />
            Are you ready for this challenge?
          </>
        ) : (
          <>
            You need to create account or log in before starting a typing
            session
          </>
        )}
      </NotifyText>
      <ButtonsRow>
        <NotifyButton onClick={() => nav.push(routes.home)}>
          GO BACK
        </NotifyButton>
        {auth ? (
          <NotifyButton onClick={acceptClick}>ACCEPT</NotifyButton>
        ) : (
          <NotifyButton onClick={() => nav.push(routes.login)}>
            LOG IN
          </NotifyButton>
        )}
      </ButtonsRow>
    </NotifyContainer>
  );
};

export default Notification;
