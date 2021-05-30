import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";

import { reduxStore } from "../../types";
import {
  Stats,
  StatPair,
  StatValue,
  StatName,
  OverviewGrid,
  UserName,
  RecentPractices,
} from "./overview/";

const rdxProps = (state: reduxStore) => ({});

const withRedux = connect(rdxProps, () => ({}));

type props = ConnectedProps<typeof withRedux>;

const Overview: FC<props> = () => {
  return (
    <OverviewGrid>
      <UserName>Username</UserName>
      <Stats>
        <StatPair>
          <StatValue>1401</StatValue>
          <StatName>Average score</StatName>
        </StatPair>
        <StatPair>
          <StatValue>401</StatValue>
          <StatName>Characters per minute</StatName>
        </StatPair>
        <StatPair>
          <StatValue>2.45</StatValue>
          <StatName>Errors rate</StatName>
        </StatPair>
        <StatPair>
          <StatValue>12328</StatValue>
          <StatName>Total Practice Length</StatName>
        </StatPair>
        <StatPair>
          <StatValue>23</StatValue>
          <StatName>Minutes spent</StatName>
        </StatPair>
      </Stats>
      <RecentPractices></RecentPractices>
    </OverviewGrid>
  );
};

export default withRedux(Overview);
