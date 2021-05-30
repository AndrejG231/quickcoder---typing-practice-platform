import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { practiceObject, reduxStore, schemeCharacters } from "../types";
import { setPractice, removeUserPracticeStat } from "../redux/actions";
import { loadPractice } from "../api";

import { Textline, Keyboard, FingerIndex } from "../components/practice";
import { Wrapper, Stats } from "../components/";
import { handlePracticeProgress } from "../utilites";

const rdxProps = (state: reduxStore) => ({
  practice: state.practice,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setPractice: (practice: practiceObject) => dispatch(setPractice(practice)),
  refreshStats: (category: string, index: number) =>
    dispatch(removeUserPracticeStat(category, index)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux> & {};

const Practice: React.FC<props> = ({ practice, setPractice, refreshStats }) => {
  const navigator = useHistory();

  const { id }: { id: string } = useParams();

  //Load practice if current loaded practice is different or not loaded
  useEffect(() => {
    if (practice?.id !== ~~id) {
      loadPractice({
        id: ~~id,
        onSuccess: (pract: practiceObject) => setPractice(pract),
        onError: () => null,
      });
    }
  }, [practice, id]);

  //Update practice by evaulating keypress handler
  const handleKeyPress = (event: KeyboardEvent) => {
    if (practice) {
      setPractice(
        handlePracticeProgress(event.key as schemeCharacters, practice, () => {
          refreshStats(practice.category, practice.practice_index);
          navigator.push(`/practice/finished/id=${practice.id}`);
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

  return (
    <Wrapper>
      <FingerIndex
        layout={"us"}
        next={practice.string[practice.index] as schemeCharacters}
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
