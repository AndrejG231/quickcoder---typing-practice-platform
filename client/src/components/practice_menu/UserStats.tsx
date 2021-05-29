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
  index: state.practiceSelection.selectedPractice?.index,
  stats: state.userPracticeStats,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  updateStats: (category: string, index: number, item: leaderboardItem) =>
    dispatch(setUsersPracticeStat(category, index, item)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const UserStats: FC<props> = ({
  category,
  menu,
  index,
  stats,
  updateStats,
}) => {
  useEffect(() => {
    if (category && menu && typeof index === "number") {
      const getStats = () =>
        getUserPracticeStats({
          category,
          practiceIndex: index,
          onSuccess: updateStats,
          onError: () => null,
        });
      if (stats[category]) {
        if (!stats[category][index]) {
          getStats();
        }
      } else {
        getStats();
      }
    }
  }, [category, menu, index, stats, updateStats]);

  if (!menu || !stats[category]) {
    return <div>Loading..</div>;
  }

  if (typeof index !== "number") {
    return <div></div>;
  }

  return (
    <UserStatsWrapper>
      {JSON.stringify(stats[category][index])}
    </UserStatsWrapper>
  );
};

export default withRedux(UserStats);
