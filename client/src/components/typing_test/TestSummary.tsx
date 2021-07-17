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
  data: string;
}

const TestSummary: FC<props> = ({ data }) => {
  const nav = useHistory();
  return (
    <NotifyContainer>
      <NotifyTitle>RESULTS</NotifyTitle>
      <NotifyText>
        Here will be some of typing test summary from server
      </NotifyText>
      <ButtonsRow>
        <NotifyButton onClick={() => nav.push(routes.typingTestNotify)}>
          TRY AGAIN
        </NotifyButton>
        <NotifyButton onClick={() => nav.push(routes.home)}>
          GO HOME
        </NotifyButton>
      </ButtonsRow>
    </NotifyContainer>
  );
};

export default TestSummary;
