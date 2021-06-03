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
  RecentPracticeName,
  RecentStatsMainLine,
  PracticeBar,
  PracticeBarValue,
  RecentPracticeScore,
} from "./overview/";
import RecentPracticeCategory from "./overview/RecentPracticeCategory";

const rdxProps = (state: reduxStore) => ({});

const withRedux = connect(rdxProps, () => ({}));

type props = ConnectedProps<typeof withRedux>;

const Overview: FC<props> = () => {
  return (
    <OverviewGrid>
      <UserName>Username</UserName>
      <Stats>
        {/* Average user's overall stats */}
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
      {/* Stats and its visuals of last 3 finished practices */}
      <RecentPractices>
        <RecentStatsMainLine />
        <PracticeBar index={0} value={100} cpm>
          <RecentPracticeName>
            Practice Name top 100 word
            <br />
            <RecentPracticeCategory>(category)</RecentPracticeCategory>
          </RecentPracticeName>
          <PracticeBarValue cpm>354</PracticeBarValue>
        </PracticeBar>
        <PracticeBar index={0} value={100} error>
          <PracticeBarValue error>2.54</PracticeBarValue>
          <RecentPracticeScore>1293</RecentPracticeScore>
        </PracticeBar>
        <RecentPracticeScore>1209</RecentPracticeScore>
        <PracticeBar index={1} value={45} cpm>
          <RecentPracticeName>
            Practice Name
            <br />
            <RecentPracticeCategory>(category)</RecentPracticeCategory>
          </RecentPracticeName>
        </PracticeBar>
        <PracticeBar index={1} value={45} error></PracticeBar>

        <PracticeBar index={2} value={45} cpm>
          <RecentPracticeName>
            Practice Name
            <br />
            <RecentPracticeCategory>(category)</RecentPracticeCategory>
          </RecentPracticeName>
        </PracticeBar>
        <PracticeBar index={2} value={45} error></PracticeBar>
      </RecentPractices>
    </OverviewGrid>
  );
};

export default withRedux(Overview);
