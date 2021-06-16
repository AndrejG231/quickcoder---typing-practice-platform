import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router";

import { reduxStore, unfinishedPractice } from "../../types";
import { setUnfinishedPractices } from "../../redux/actions";
import { getUnfinishedPractices } from "../../api";
import {
  HistoryGrid,
  Indexes,
  ItemInfoText,
  ItemList,
  ItemRow,
  Items,
  SummaryLinkButton,
} from "./history/";

const rdxState = (state: reduxStore) => ({
  unfinishedPractices: state.profile.unfinished,
  unfinishedCount: state.profile.unfinishedCount,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setUnfinished: (practices: unfinishedPractice[]) =>
    dispatch(setUnfinishedPractices(practices)),
});

const withRedux = connect(rdxState, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Unfinished: FC<props> = ({
  unfinishedPractices,
  setUnfinished,
  unfinishedCount,
}) => {
  const nav = useHistory();

  useEffect(() => {
    if (unfinishedPractices.length < unfinishedCount) {
      getUnfinishedPractices({
        onSuccess: (practices) => {
          setUnfinished(practices);
        },
        onError: () => null,
      });
    }
  }, [unfinishedCount, unfinishedPractices]);

  if (unfinishedCount === 0) {
    return <div>No unfinished practices...</div>;
  }

  if (unfinishedCount > unfinishedPractices.length) {
    return <div>Loading....</div>;
  }

  return (
    <HistoryGrid>
      <Items>
        <ItemList>
          {unfinishedPractices.map((item, index) => (
            <ItemRow key={index}>
              <ItemInfoText darken>
                {new Date(item.created_at).toLocaleString("uk-en")}
              </ItemInfoText>
              <ItemInfoText>{item.category}</ItemInfoText>
              <ItemInfoText darken>Top 200 English words</ItemInfoText>
              {/* <ItemInfoText>{item.score}</ItemInfoText> */}
              <ItemInfoText darken>{item.completion}</ItemInfoText>
              {/* <ItemInfoText>{item.error_rate.toFixed(2)}</ItemInfoText> */}
              <ItemInfoText darken>{item.length}</ItemInfoText>
              <SummaryLinkButton
                onClick={() => nav.push(`/practice/finished/id=${item.id}/`)}
              />
            </ItemRow>
          ))}
        </ItemList>
      </Items>
      <Indexes>
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

export default withRedux(Unfinished);
