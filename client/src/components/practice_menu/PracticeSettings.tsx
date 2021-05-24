import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { selectPracticeLength } from "../../redux/actions";
import { reduxStore } from "../../types";
import {
  LengthDecreaseButton,
  LengthIncreaseButton,
  LengthDisplay,
  LengthSelection,
  SettingsWrapper,
  StartButton,
} from "./practice_settings";

const rdxProps = (state: reduxStore) => {
  const category =
    state.practiceMenu.length > 0
      ? state.practiceMenu[state.practiceSelection.selectedCategory].category
      : "";
  const practice = state.practiceSelection.selectedPractice
    ? state.practiceSelection.selectedPractice
    : "";
  return {
    length: state.practiceSelection.length,
    selectionString:
      category && practice ? `c=${category}/i=${practice.index}` : "",
    category,
    practice,
  };
};

const rdxDispatch = (dispatch: Dispatch) => ({
  setLength: (length: number) => dispatch(selectPracticeLength(length)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const PracticeSettings: FC<props> = ({
  category,
  practice,
  length,
  setLength,
  selectionString,
}) => {
  const nav = useHistory();
  return (
    <SettingsWrapper>
      <LengthSelection>
        <LengthDecreaseButton size={22} onClick={() => setLength(-1)} />
        <LengthDisplay>{length}</LengthDisplay>
        <LengthIncreaseButton size={22} onClick={() => setLength(1)} />
      </LengthSelection>
      {selectionString ? (
        <StartButton
          onClick={() =>
            nav.push(`/create_practice/${selectionString}/l=${length}`)
          }
        >
          Start
        </StartButton>
      ) : (
        <StartButton>Select practice first..</StartButton>
      )}
    </SettingsWrapper>
  );
};

export default withRedux(PracticeSettings);
