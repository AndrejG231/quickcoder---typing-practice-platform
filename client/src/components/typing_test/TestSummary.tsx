import React, { FC } from "react";
import { useHistory } from "react-router";

import {
  NotifyContainer,
  NotifyTitle,
  ButtonsRow,
  NotifyButton,
  NotifyText,
  StatPair,
} from "./";
import { routes } from "../../static";
import { finishedTestStats } from "../../types";

interface props {
  data: finishedTestStats;
}

const TestSummary: FC<props> = ({ data }) => {
  const nav = useHistory();
  return (
    <NotifyContainer>
      <NotifyTitle>RESULTS</NotifyTitle>
      <StatPair>
        <NotifyText>Score:</NotifyText>
        <NotifyText big>{data.score}</NotifyText>
      </StatPair>
      <StatPair>
        <NotifyText>CPM:</NotifyText>
        <NotifyText big>{data.cpm}</NotifyText>
      </StatPair>
      <StatPair>
        <NotifyText>Errors:</NotifyText>
        <NotifyText big>{data.errors}</NotifyText>
      </StatPair>
      <StatPair>
        <NotifyText>Errors rate:</NotifyText>
        <NotifyText big>{data.errorRate}</NotifyText>
      </StatPair>
      <StatPair>
        <NotifyText>Better than:</NotifyText>
        <NotifyText big>{Math.round(data.betterThan * 100)}%</NotifyText>
      </StatPair>
      <ButtonsRow>
        <NotifyButton onClick={() => nav.push(routes.typingTestNotify)} third>
          TRY AGAIN
        </NotifyButton>
        <NotifyButton onClick={() => nav.push(routes.profileTests)} third>
          STATS
        </NotifyButton>
        <NotifyButton onClick={() => nav.push(routes.home)} third>
          GO HOME
        </NotifyButton>
      </ButtonsRow>
    </NotifyContainer>
  );
};

export default TestSummary;
