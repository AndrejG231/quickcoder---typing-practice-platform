import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import MenuItem from "../components/menu/MenuItem";
import { practiceMenuQuery, userStatsQuery } from "../graphql/practice";
import {
  setTrueCategoryAction,
  addIndexAction,
  addMenuItemAction,
} from "../redux/actions/practiceMenuActions";
import { setPracticeUserStatsAction } from "../redux/actions/practiceUserStatsActions";
import {
  addIndexActionT,
  addMenuItemActionT,
  MenuItemT,
} from "../types/redux/PracticeMenuT";
import { userStatObjectT } from "../types/redux/PracticeUserStats";
import { ReduxState } from "../types/redux/ReduxState";
import "./PracticeMenu.scss";

const rdxProps = (state: ReduxState) => {
  return {
    practiceData: state.PracticeMenu.practiceData,
    index: state.PracticeMenu.index,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    setTrue: (category: string) => dispatch(setTrueCategoryAction(category)),
    addItem: (item: MenuItemT) => dispatch(addMenuItemAction(item)),
    setStats: (stat: userStatObjectT) =>
      dispatch(setPracticeUserStatsAction(stat)),
    addIndex: () => dispatch(addIndexAction()),
  };
};

interface PracticeMenuProps {
  setTrue: (category: string) => void;
  index: number;
  practiceData: MenuItemT[];
  addItem: addMenuItemActionT;
  addIndex: addIndexActionT;
  setStats: (stat: userStatObjectT) => void;
}

const PracticeMenu: React.FC<PracticeMenuProps> = ({
  setTrue,
  index,
  addIndex,
  practiceData,
  addItem,
  setStats,
}) => {
  const [getItem, { data, error }] = useLazyQuery(practiceMenuQuery);
  const practiceStats = useQuery(userStatsQuery);

  useEffect(() => {
    if (data?.getItem?.item) {
      addItem(data.getItem.item);
      addIndex();
    }
  }, [data]);

  useEffect(() => {
    setTimeout(() => getItem({ variables: { index: index } }), 10);
  }, [index]);

  useEffect(() => {
    if (practiceStats.data?.getUserStats) {
      practiceStats.refetch();
      practiceStats.data.getUserStats.stats.forEach(
        (stat: { name: string; length: number; score: number }) => {
          const { length, score } = stat;
          setStats({ [stat.name]: { length, score } });
        }
      );
    }
  }, [practiceStats.data]);

  if (error) {
    return <div>Error..</div>;
  }

  return (
    <div>
      <div className="pM-items">
        {practiceData.map((item, index) => {
          if (item.type === "category") {
            setTrue(item.name);
          }
          return (
            <MenuItem
              category={item.category}
              onClick={() => null}
              desc={item.description as string}
              type={item.type as string}
              title={item.name as string}
              overwiev={item.overview ? (item.overview as string) : ""}
              key={index}
            />
          );
        })}
      </div>
      <div className="pM-settingsBar"></div>
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeMenu);
