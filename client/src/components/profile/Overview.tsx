import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { setProfileOverview } from "../../redux/actions";
import { reduxStore, userProfileOverview } from "../../types";
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
  RecentPracticeCategory,
  RecentStatsIndex,
} from "./overview/";
import { getProfileOverview } from "../../api";
import { getCategoryIndex } from "../../utilites";

const rdxProps = (state: reduxStore) => ({
  overview: state.profile.overview,
  username: state.authentication.user?.username,
  menu: state.practiceMenu,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setProfileOverview: (overview: userProfileOverview) =>
    dispatch(setProfileOverview(overview)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Overview: FC<props> = ({
  username,
  setProfileOverview,
  overview,
  menu,
}) => {
  useEffect(() => {
    if (!overview) {
      getProfileOverview({
        onSuccess: setProfileOverview,
        onError: () => {
          console.log("ERROR");
        },
      });
    }
  }, [overview]);

  if (!overview || !menu) {
    return <div>Loading..</div>;
  }

  const { averageStats, lastPractices } = overview;

  return (
    <OverviewGrid>
      <UserName>{username}</UserName>
      <Stats>
        {/* Average user's overall stats */}
        <StatPair>
          <StatValue>{averageStats.averageScore}</StatValue>
          <StatName>Average score</StatName>
        </StatPair>
        <StatPair>
          <StatValue>{averageStats.averageCpm}</StatValue>
          <StatName>Characters per minute</StatName>
        </StatPair>
        <StatPair>
          <StatValue>{averageStats.averageErrorsRate.toFixed(2)}</StatValue>
          <StatName>Errors rate</StatName>
        </StatPair>
        <StatPair>
          <StatValue>{averageStats.totalLength}</StatValue>
          <StatName>Total Practice Length</StatName>
        </StatPair>
        <StatPair>
          <StatValue>
            {Math.round(averageStats.finishedTimeSpent / 1000 / 60)}
          </StatValue>
          <StatName>Minutes spent</StatName>
        </StatPair>
      </Stats>
      {/* Stats and its visuals of last 5 finished practices */}
      <RecentPractices>
        <RecentStatsMainLine />
        <RecentStatsIndex>CPM</RecentStatsIndex>
        <RecentStatsIndex error>Error Rate</RecentStatsIndex>
        {lastPractices.map((item, index) => {
          // Bar sizes calculations
          const cpm = Math.min(100, (item.cpm / 440) * 100);
          const errors = item.error_rate
            ? Math.max(Math.min(100, 100 - (item.error_rate - 1) * 20), 0)
            : 0;

          const categoryIndex = getCategoryIndex(item.category, menu);

          const practiceName =
            menu[categoryIndex!].items[item.practice_index].name;

          // Mapped cpm and error bars for each practice
          return [
            <PracticeBar key={index} index={index} value={cpm} cpm>
              <RecentPracticeName value={cpm}>
                {practiceName}
                <br />
                <RecentPracticeCategory>
                  ({item.category})
                </RecentPracticeCategory>
              </RecentPracticeName>
              <PracticeBarValue cpm>{item.cpm}</PracticeBarValue>
            </PracticeBar>,
            <PracticeBar
              key={10 * index + 1}
              index={index}
              value={errors}
              error
            >
              <PracticeBarValue error>
                {item.error_rate.toFixed(2)}
              </PracticeBarValue>
            </PracticeBar>,
          ];
        })}
      </RecentPractices>
    </OverviewGrid>
  );
};

export default withRedux(Overview);
