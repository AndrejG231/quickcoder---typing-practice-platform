import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { practiceObject, reduxStore, schemeCharacters } from "../types";
import { setPractice } from "../redux/actions";
import { createPractice } from "../api";

import { Wrapper, Textline, Keyboard } from "../components/practice";
import { handlePracticeProgress } from "../utilites";

import { us } from "../static/layouts";
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

  const {
    category,
    index,
    length,
  }: {
    category: string;
    index: string;
    length: string;
  } = useParams();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (practice) {
      setPractice(
        handlePracticeProgress(
          event.key as schemeCharacters,
          practice,
          () => null,
          () => null
        )
      );
    }
  };

  useEffect(() => {
    if (!practice) {
      createPractice({
        category,
        index: ~~index,
        length: ~~length,
        onSuccess: setPractice,
        onError: () => null,
      });
    }
  }, [practice]);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  });

  if (!practice) {
    return <div>Loading....</div>;
  }

  return (
    <Wrapper>
      <FingerIndex layout={"us"} next={practice.string[practice.index] as c} />
      <Textline />
      <Keyboard
        keyboard={"us"}
        next={practice.string[practice.index] as schemeCharacters}
      />
      {/* <FingerIndex width={window.innerWidth > 1580 ? 1000 : 800} />
      <TextLine />
      <KeyBoard
        width={window.innerWidth > 1580 ? 800 : 600}
        layout={}
        className="p-keyboard"
      />
      <LiveStats
        width={window.innerWidth > 1580 ? 1000 : 800}
        startTime={practice.startTime}
        characters={practice.index}
        errors={Object.keys(practice.errors).length}
      /> */}
    </Wrapper>
  );
};

export default withRedux(Practice);
