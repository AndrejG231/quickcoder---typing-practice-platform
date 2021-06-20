import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router";

import { reduxStore, unfinishedPractice } from "../../types";
import {
  setGlobalMessage,
  setUnfinishedPractices,
  setUnfinishedPracticesCount,
} from "../../redux/actions";
import {
  deleteAllUnfinishedPractices,
  deletePractice,
  getUnfinishedPractices,
} from "../../api";
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
import { getCategoryIndex } from "../../utilites";

const rdxState = (state: reduxStore) => ({
  unfinishedPractices: state.profile.unfinished,
  unfinishedCount: state.profile.unfinishedCount,
  menu: state.practiceMenu,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setUnfinished: (practices: unfinishedPractice[]) =>
    dispatch(setUnfinishedPractices(practices)),
  setGlobalMsg: (message: string) => dispatch(setGlobalMessage(message)),
  setUnfinishedCount: (count: number) =>
    dispatch(setUnfinishedPracticesCount(count)),
});

const withRedux = connect(rdxState, rdxDispatch);
type props = ConnectedProps<typeof withRedux>;

const Unfinished: FC<props> = ({
  menu,
  unfinishedPractices,
  setUnfinished,
  setUnfinishedCount,
  setGlobalMsg,
  unfinishedCount,
}) => {
  const nav = useHistory();
  const template = `2fr 2fr 2fr 1fr 1fr 1fr 1fr`;

  // Fetching unfinished practices when counts do not match or there are no unfinished practices loaded
  useEffect(() => {
    if (unfinishedPractices.length < unfinishedCount) {
      getUnfinishedPractices({
        onSuccess: (practices) => {
          setUnfinished(practices);
        },
        onError: setGlobalMsg,
      });
    }
  }, [unfinishedCount, unfinishedPractices]);

  // delete unfinished practice handler
  const doDeletePractice = (id: number, index: number) => {
    deletePractice({
      id,
      onSuccess: () => {
        setUnfinished([
          ...unfinishedPractices.slice(0, index),
          ...unfinishedPractices.slice(index + 1),
        ]);
        setUnfinishedCount(unfinishedCount - 1);
      },
      onError: () => setGlobalMsg,
    });
  };

  // delete all unfinished practice handler
  const doDeleteAll = () => {
    deleteAllUnfinishedPractices({
      onSuccess: () => {
        setUnfinished([]);
        setUnfinishedCount(0);
      },
      onError: () => setGlobalMsg,
    });
  };

  if (unfinishedCount === 0) {
    return <div>No unfinished practices...</div>;
  }

  if (unfinishedCount > unfinishedPractices.length) {
    return <div>Loading....</div>;
  }

  return (
    <UnfinishedGrid>
      <DeleteAllButton onClick={doDeleteAll} />
      <Items>
        <ItemList>
          {unfinishedPractices.map((item, index) => {
            const categoryIndex = getCategoryIndex(item.category, menu);
            return (
              <ItemRow key={index} template={template}>
                <ItemInfoText darken>
                  {new Date(item.created_at).toLocaleString("uk-en")}
                </ItemInfoText>
                <ItemInfoText>{item.category}</ItemInfoText>
                <ItemInfoText darken>
                  {menu[categoryIndex!].items[item.practice_index].name}
                </ItemInfoText>
                <ItemInfoText>{item.completion}%</ItemInfoText>
                <ItemInfoText darken>{item.length}</ItemInfoText>
                <DeleteButton
                  onClick={() => doDeletePractice(item.id, index)}
                />
                <ContinueButton
                  onClick={() =>
                    nav.push(`/practice/in_progress/id=${item.id}/`)
                  }
                />
              </ItemRow>
            );
          })}
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
