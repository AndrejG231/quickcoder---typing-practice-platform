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
  user: state.authentication.user,
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

type props = ConnectedProps<typeof withRedux> & {
  typingTest?: (practice: practiceObject) => void;
};

const Practice: React.FC<props> = ({
  practice,
  setPractice,
  refreshStats,
  unfinished,
  refreshUnfinished,
  user,
  typingTest,
}) => {
  const navigator = useHistory();

  const { id }: { id: string } = useParams();

  //Load practice if current loaded practice is different or not loaded
  useEffect(() => {
    if (!typingTest) {
      // None of these neccessery when processing typing test
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
            navigator.push(routes.finishedPractice(practice.id));
            refreshStats(practice.category, practice.practice_index);
            // This won't be fired on typing test finish
          },
          typingTest,
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
  if (typingTest) {
    if (!practice || practice.practice_index !== -1) {
      return <div>Error: failed to create typing test</div>;
    }
  } else {
    if (!practice || practice?.id !== ~~id) {
      return <div>Loading....</div>;
    }

    if (practice?.is_finished) {
      return <div>Erorr: this practice is finished.</div>;
    }
  }
  // TODO: Add some more pleasing error screens

  // No keyboard, stats or indexes for typing test
  if (typingTest) {
    return (
      <Wrapper>
        <Textline
          practice={practice}
          animations={user ? user.animations : true}
        />
      </Wrapper>
    );
  }

  console.log(practice);
  return (
    <Wrapper>
      {(user ? user.keyboard_indexes : true) ? (
        <FingerIndex

        // layout={"us"}
        // next={practice.string[practice.index] as schemeCharacters}
        />
      ) : null}
      <Textline
        practice={practice}
        animations={user ? user.animations : true}
      />
      {(user ? user.keyboard_visuals : true) ? (
        <Keyboard
          keyboard={"us"}
          next={practice.string[practice.index] as schemeCharacters}
          lastError={practice.last_error as schemeCharacters}
        />
      ) : null}
      <Stats practice={practice} />
    </Wrapper>
  );
};

export default withRedux(Practice);
