import React, { FC } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { selectPracticeLength } from "../../redux/actions";
import { practiceItem, reduxStore } from "../../types";
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
  const practiceName = state.practiceSelection.selectedPractice
    ? state.practiceSelection.selectedPractice.name
    : "";
  return {
    length: state.practiceSelection.length,
    selectionString: `${category}+${practiceName}`,
    practiceName,
  };
};

const rdxDispatch = (dispatch: Dispatch) => ({
  setLength: (length: number) => dispatch(selectPracticeLength(length)),
});

interface PracticeSettingsProps {
  setLength: (length: number) => void;
  length: number;
  selectionString: string;
  practiceName: string;
}

const PracticeSettings: FC<PracticeSettingsProps> = ({
  length,
  setLength,
  selectionString,
  practiceName,
}) => {
  const nav = useHistory();
  return (
    <SettingsWrapper>
      <LengthSelection>
        <LengthDecreaseButton size={22} onClick={() => setLength(-1)} />
        <LengthDisplay>{length}</LengthDisplay>
        <LengthIncreaseButton size={22} onClick={() => setLength(1)} />
      </LengthSelection>
      {practiceName ? (
        <StartButton
          onClick={() => nav.push(`/practice/p=${selectionString}/l=${length}`)}
        >
          Start
        </StartButton>
      ) : (
        <StartButton>Select practice first..</StartButton>
      )}
    </SettingsWrapper>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeSettings);
