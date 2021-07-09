import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { practiceObject, reduxStore, schemeCharacters } from "../types";
import {
  setPractice,
  removeUserPracticeStat,
  resetProfile,
  togglePracticeHistoryRefresh,
  setUnfinishedPracticesCount,
  setUnfinishedPractices,
} from "../redux/actions";
import { loadPractice } from "../api";

import { Textline, Keyboard, FingerIndex } from "../components/practice";
import { Wrapper, Stats } from "../components/";
import { handlePracticeProgress } from "../utilites";
import { routes } from "../static";

const rdxProps = (state: reduxStore) => ({
  practice: state.practice,
  unfinished: state.profile.unfinished.length + state.profile.unfinishedCount,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setPractice: (practice: practiceObject) => dispatch(setPractice(practice)),
  refreshStats: (category: string, index: number) => {
    dispatch(removeUserPracticeStat(category, index));
    dispatch(togglePracticeHistoryRefresh(true));
    dispatch(resetProfile("overview"));
  },
  refreshUnfinished: () => {
    dispatch(setUnfinishedPracticesCount(0));
    dispatch(setUnfinishedPractices([]));
  },
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Practice: React.FC<props> = ({
  practice,
  setPractice,
  refreshStats,
  unfinished,
  refreshUnfinished,
}) => {
  const navigator = useHistory();

  const { id }: { id: string } = useParams();

  //Load practice if current loaded practice is different or not loaded
  useEffect(() => {
    // In case of practice was left in progress force unfinished practices refetching
    if (unfinished) {
      refreshUnfinished();
    }
    // In case of current practice in memory not same as one we try to practice for - fetch selected practice
    if (practice?.id !== ~~id) {
      loadPractice({
        id: ~~id,
        onSuccess: (pract: practiceObject) => setPractice(pract),
        onError: () => null,
      });
    }
  }, [unfinished, practice, id, refreshUnfinished, setPractice]);

  //Update practice by evaulating keypress handler
  const handleKeyPress = (event: KeyboardEvent) => {
    if (practice) {
      setPractice(
        handlePracticeProgress({
          keyPressed: event.key as schemeCharacters,
          state: practice,
          onFinish: () => {
            // force profile overview refetch
            // new history item fetching
            // fetch new stats for current category+practice on next menu load
            refreshStats(practice.category, practice.practice_index);
            navigator.push(routes.finishedPractice(practice.id));
          },
        })
      );
    }
  };

  //Keypress event listener
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  });

  //Loading screen while practice is not loaded or different
  if (!practice || practice?.id !== ~~id) {
    return <div>Loading....</div>;
  }

  if (practice?.is_finished) {
    return <div>Erorr: this practice is finished.</div>;
  }

  return (
    <Wrapper>
      <FingerIndex
      // layout={"us"}
      // next={practice.string[practice.index] as schemeCharacters}
      />
      <Textline practice={practice} />
      <Keyboard
        keyboard={"us"}
        next={practice.string[practice.index] as schemeCharacters}
        lastError={practice.last_error as schemeCharacters}
      />
      <Stats practice={practice} />
    </Wrapper>
  );
};

export default withRedux(Practice);
