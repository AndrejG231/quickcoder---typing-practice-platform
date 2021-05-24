import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { practiceObject, reduxStore, schemeCharacters } from "../types";
import { setPractice } from "../redux/actions";
import { loadPractice } from "../api";

import { Wrapper, Textline, Keyboard, Stats } from "../components/practice";
import { handlePracticeProgress } from "../utilites";

import FingerIndex from "../components/practice/FingerIndex";

const rdxProps = (state: reduxStore) => ({
  practice: state.practice,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setPractice: (practice: practiceObject) => dispatch(setPractice(practice)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux> & {};

const Practice: React.FC<props> = ({ practice, setPractice }) => {
  const navigator = useHistory();

  const { id }: { id: string } = useParams();

  useEffect(() => {
    if (practice?.id !== ~~id) {
      loadPractice({
        id: ~~id,
        onSuccess: (pract: practiceObject) => setPractice(pract),
        onError: () => null,
      });
    }
  }, [practice, id]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (practice) {
      setPractice(
        handlePracticeProgress(event.key as schemeCharacters, practice, () =>
          navigator.push(`/practice/finished/id=${practice.id}`)
        )
      );
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  });

  if (!practice || practice?.id !== ~~id) {
    return <div>Loading....</div>;
  }

  return (
    <Wrapper>
      <FingerIndex
        layout={"us"}
        next={practice.string[practice.index] as schemeCharacters}
      />
      <Textline />
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
