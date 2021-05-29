import React, { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { leaderboardItem, reduxStore } from "../../types";
import { UserStatsWrapper } from "./user_stats";
import { setUsersPracticeStat } from "../../redux/actions";
import { getUserPracticeStats } from "../../api";

const rdxProps = (state: reduxStore) => ({
  category:
    state.practiceMenu[state.practiceSelection.selectedCategory].category,
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
  let displayStats = {
    cpm: 0,
    index: 0,
    score: 0,
    errors_rate: 0,
  };

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

  if (menu && stats[category] && typeof practiceIndex === "number") {
    if (stats[category][practiceIndex]) {
      displayStats = stats[category][practiceIndex] || displayStats;
    }
  }

  return <UserStatsWrapper></UserStatsWrapper>;
};

export default withRedux(UserStats);
