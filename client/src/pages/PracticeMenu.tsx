import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuItem from "../components/menu/MenuItem";
import { practiceMenuQuery } from "../graphql/practice";
import {
  setTrueCategoryAction,
  addIndexAction,
  addMenuItemAction,
} from "../redux/actions/practiceMenuActions";
import {
  addIndexActionT,
  addMenuItemActionT,
  MenuItemT,
} from "../types/redux/practiceMenuT";
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
    addIndex: () => dispatch(addIndexAction()),
  };
};

interface PracticeMenuProps {
  setTrue: (category: string) => void;
  index: number;
  practiceData: MenuItemT[];
  addItem: addMenuItemActionT;
  addIndex: addIndexActionT;
}

const PracticeMenu: React.FC<PracticeMenuProps> = ({
  setTrue,
  index,
  addIndex,
  practiceData,
  addItem,
}) => {
  const [getItem, { data, error }] = useLazyQuery(practiceMenuQuery);

  useEffect(() => {
    if (data?.getItem?.item?.type) {
      addItem(data.getItem.item);
      addIndex();
    } else {
    }
  }, [data]);

  useEffect(() => {
    console.log("Getting new data");
    setTimeout(() => getItem({ variables: { index: index } }), 10);
  }, [index]);

  if (error) {
    return <div>Error..</div>;
  }

  let category: string;
  return (
    <div>
      <div className="pM-items">
        {practiceData.map((item, index) => {
          if (item.type === "category") {
            category = item.name as string;
            setTrue(category);
          }
          return (
            <MenuItem
              category={category}
              onClick={() => null}
              desc={item.description as string}
              type={item.type as string}
              title={item.name.replaceAll("_", " ") as string}
              overwiev={item.overview ? (item.overview as string) : ""}
              key={index}
              userScore={item.userScore}
              userPlayLength={item.userPlayLength}
            />
          );
        })}
      </div>
      <div className="pM-settingsBar"></div>
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeMenu);
