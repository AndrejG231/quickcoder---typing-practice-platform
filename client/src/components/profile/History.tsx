import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";

import { reduxStore, userPracticeHistory } from "../../types";
import { setProfileHistory } from "../../redux/actions";
import { getProfileHistory } from "../../api";
import {
  HistoryGrid,
  Indexes,
  ItemInfoText,
  ItemList,
  ItemRow,
  Items,
  SummaryLinkButton,
} from "./history/";
import { getCategoryIndex } from "../../utilites";
import { routes } from "../../static";

const rdxState = (state: reduxStore) => ({
  history: state.profile.history,
  awaitingUpdate: state.profile.awaitingHistoryUpdate,
  menu: state.practiceMenu,
  animation: state.animations.profileChild,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  updateHistory: (type: "load" | "update", history: userPracticeHistory) =>
    dispatch(setProfileHistory(history, type)),
});

const withRedux = connect(rdxState, rdxDispatch);

type props = ConnectedProps<typeof withRedux> & {
  redirectOut: (path: string) => void;
};

const History: FC<props> = ({
  awaitingUpdate,
  history,
  updateHistory,
  menu,
  animation,
  redirectOut,
}) => {
  const nav = useHistory();
  const template = "2fr 2fr 2.5fr 1fr 1fr 1fr 1fr 1fr";

  // History fetching
  useEffect(() => {
    if (!history) {
      // Fetch whole history on first load
      getProfileHistory({
        type: "load",
        onError: () => null, //TODO: handle error when fetching
        onSuccess: updateHistory,
      });
    } else if (awaitingUpdate) {
      // Fetch additional practices after history update
      getProfileHistory({
        type: "update",
        onError: () => null, //TODO: handle error when fetching
        onSuccess: updateHistory,
        lastDate: history.lastPractices[0].created_at,
      });
    }
  }, [awaitingUpdate, history, updateHistory]);

  if (!history) {
    return <div>Loading...</div>;
  }

  return (
    <HistoryGrid>
      <Items isOnScreen={animation}>
        <ItemList>
          {history.lastPractices.map((item, index) => {
            const categoryIndex = getCategoryIndex(item.category, menu);
            return (
              <ItemRow key={index} template={template}>
                <ItemInfoText darken>
                  {new Date(item.created_at).toLocaleString("uk-en")}
                </ItemInfoText>
                <ItemInfoText>{menu[categoryIndex!].category}</ItemInfoText>
                <ItemInfoText darken>
                  {menu[categoryIndex!].items[item.practice_index].name}
                </ItemInfoText>
                <ItemInfoText>{item.score}</ItemInfoText>
                <ItemInfoText darken>{item.cpm}</ItemInfoText>
                <ItemInfoText>{item.error_rate.toFixed(2)}</ItemInfoText>
                <ItemInfoText darken>{item.length}</ItemInfoText>
                <SummaryLinkButton
                  onClick={() => redirectOut(routes.finishedPractice(item.id))}
                />
              </ItemRow>
            );
          })}
        </ItemList>
      </Items>
      <Indexes template={template} isOnScreen={animation}>
        <ItemInfoText index darken>
          Time of practice
        </ItemInfoText>
        <ItemInfoText index>Category</ItemInfoText>
        <ItemInfoText index darken>
          Name
        </ItemInfoText>
        <ItemInfoText index>Score</ItemInfoText>
        <ItemInfoText index darken>
          Cpm
        </ItemInfoText>
        <ItemInfoText index>Errors %</ItemInfoText>
        <ItemInfoText index darken>
          Length
        </ItemInfoText>
        <ItemInfoText index>Details</ItemInfoText>
      </Indexes>
    </HistoryGrid>
  );
};

export default withRedux(History);
