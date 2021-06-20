import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router";

import { reduxStore, unfinishedPractice } from "../../types";
import { setUnfinishedPractices } from "../../redux/actions";
import { getUnfinishedPractices } from "../../api";
import {
  ItemInfoText,
  ItemList,
  ItemRow,
  Items,
  Indexes,
  SummaryLinkButton,
} from "./history/";
import {
  ContinueButton,
  DeleteAllButton,
  DeleteButton,
  UnfinishedGrid,
} from "./unfinished/";

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
  const template = `2fr 2fr 2fr 1fr 1fr 1fr 1fr`;

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
    <UnfinishedGrid>
      <DeleteAllButton />
      <Items>
        <ItemList>
          {unfinishedPractices.map((item, index) => (
            <ItemRow key={index} template={template}>
              <ItemInfoText darken>
                {new Date(item.created_at).toLocaleString("uk-en")}
              </ItemInfoText>
              <ItemInfoText>{item.category}</ItemInfoText>
              <ItemInfoText darken>Top 200 English words</ItemInfoText>
              <ItemInfoText>{item.completion}</ItemInfoText>
              <ItemInfoText darken>{item.length}</ItemInfoText>
              <DeleteButton />
              <ContinueButton />
            </ItemRow>
          ))}
        </ItemList>
      </Items>
      <Indexes template={template}>
        <ItemInfoText index darken>
          Time of practice
        </ItemInfoText>
        <ItemInfoText index>Category</ItemInfoText>
        <ItemInfoText index darken>
          Name
        </ItemInfoText>
        <ItemInfoText index>Completion</ItemInfoText>
        <ItemInfoText index darken>
          Length
        </ItemInfoText>
        <ItemInfoText index>Remove</ItemInfoText>
        <ItemInfoText index darken>
          Continue
        </ItemInfoText>
      </Indexes>
    </UnfinishedGrid>
  );
};

export default withRedux(Unfinished);
