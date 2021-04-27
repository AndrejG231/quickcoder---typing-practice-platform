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
import { practiceSetSelected } from "../redux/actions/practiceSelectionActions";
import {
  addIndexActionT,
  addMenuItemActionT,
  MenuItemT,
} from "../types/types_redux/PracticeMenuT";
import PracticeSelector from "../components/menu/PracticeSelector";
import { userStatObjectT } from "../types/types_redux/userPracticeStatsT";
import { ReduxState } from "../types/reduxStore";

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
    selectPractice: (practice: string) =>
      dispatch(practiceSetSelected(practice)),
  };
};

interface PracticeMenuProps {
  setTrue: (category: string) => void;
  index: number;
  practiceData: MenuItemT[];
  addItem: addMenuItemActionT;
  addIndex: addIndexActionT;
  setStats: (stat: userStatObjectT) => void;
  selectPractice: (practice: string) => void;
}

const PracticeMenu: React.FC<PracticeMenuProps> = ({
  setTrue,
  index,
  addIndex,
  practiceData,
  addItem,
  setStats,
  selectPractice,
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
    if (practiceStats.data?.getUserStats.stats) {
      practiceStats.refetch();
      practiceStats.data.getUserStats.stats.forEach(
        (stat: {
          name: string;
          length: number;
          score: number;
          cpm: number;
          error_rate: number;
        }) => {
          const { length, score, cpm, error_rate } = stat;
          setStats({ [stat.name]: { length, score, cpm, error_rate } });
        }
      );
    }
  }, [practiceStats.data]);

  if (error) {
    return <div>Error..</div>;
  }

  return (
    <div style={{ width: "100vw" }}>
      <div className="pM-items">
        {practiceData.map((item, index) => {
          let onClick = () => {};
          if (item.type === "category") {
            setTrue(item.name);
          } else {
            onClick = () => {
              selectPractice(`${item.category}+${item.name}`);
            };
          }
          return (
            <MenuItem
              category={item.category}
              onClick={onClick}
              desc={item.description as string}
              type={item.type as string}
              title={item.name as string}
              overwiev={item.overview ? (item.overview as string) : ""}
              key={index}
            />
          );
        })}
      </div>
      <PracticeSelector />
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeMenu);
