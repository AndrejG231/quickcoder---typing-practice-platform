import React, { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { leaderboardItem, reduxStore } from "../../types";
import {
  UserStatsWrapper,
  StatBar,
  DrawBar,
  StatName,
  StatValue,
} from "./user_stats";
import { setUsersPracticeStat } from "../../redux/actions";
import { getUserPracticeStats } from "../../api";

const rdxProps = (state: reduxStore) => ({
  category: state.practiceMenu
    ? state.practiceMenu[state.practiceSelection.selectedCategory].category
    : null,
  // Resolve category name from practice menu and category index
  menu: state.practiceMenu,
  practiceIndex: state.practiceSelection.selectedPractice?.index,
  stats: state.userPracticeStats,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  updateStats: (category: string, index: number, item: leaderboardItem) =>
    dispatch(setUsersPracticeStat(category, index, item)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const UserStats: FC<props> = ({
  practiceIndex,
  category,
  menu,
  stats,
  updateStats,
}) => {
  // Default stats displayed
  let displayStats = {
    cpm: 0,
    index: 0,
    score: 0,
    errors_rate: 0,
  };

  // Load stats for current practice if there are not in stats state
  useEffect(() => {
    if (category && menu && typeof practiceIndex === "number") {
      const getStats = () =>
        getUserPracticeStats({
          category,
          practiceIndex,
          onSuccess: updateStats,
          onError: () => null,
        });
      if (stats[category]) {
        if (!stats[category][practiceIndex]) {
          getStats();
        }
      } else {
        getStats();
      }
    }
  }, [category, menu, practiceIndex, stats, updateStats]);

  // if loaded successfully replace default stats with loaded stats
  if (
    menu &&
    category &&
    stats[category] &&
    typeof practiceIndex === "number"
  ) {
    if (stats[category][practiceIndex]) {
      displayStats = stats[category][practiceIndex] || displayStats;
    }
  }

  // Calculate barfill sizes from stats
  const barSizes = {
    score: Math.min(100, (displayStats.score / 1200) * 100),
    cpm: Math.min(100, (displayStats.cpm / 440) * 100),
    errors_rate: displayStats.errors_rate
      ? Math.max(Math.min(100, 100 - (displayStats.errors_rate - 1) * 20), 0)
      : 0,
    index: Math.min(100, (displayStats.index / 2000) * 100),
  };

  return (
    <UserStatsWrapper>
      <StatBar>
        <StatName>Score</StatName>
        <DrawBar width={barSizes.score} />
        <StatValue>{displayStats.score}</StatValue>
      </StatBar>
      <StatBar>
        <StatName>CPM</StatName>
        <DrawBar width={barSizes.cpm} />
        <StatValue>{displayStats.cpm}</StatValue>
      </StatBar>
      <StatBar>
        <StatName>Errors</StatName>
        <DrawBar width={barSizes.errors_rate} />
        <StatValue>{displayStats.errors_rate.toFixed(2)}%</StatValue>
      </StatBar>
      <StatBar>
        <StatName>Length</StatName>
        <DrawBar width={barSizes.index} />
        <StatValue>
          {displayStats.index > 2000 ? 2000 : displayStats.index}
        </StatValue>
      </StatBar>
    </UserStatsWrapper>
  );
};

export default withRedux(UserStats);
