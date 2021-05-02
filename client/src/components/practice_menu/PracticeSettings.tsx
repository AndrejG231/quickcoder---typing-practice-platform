import React, { FC } from "react";
import { connect } from "react-redux";
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

const rdxProps = (state: reduxStore) => ({
  selectedPractice: state.practiceSelection.selectedPractice,
  length: state.practiceSelection.length,
  lengthIndex: state.practiceSelection.lengthIndex,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setLength: (length: number) => dispatch(selectPracticeLength(length)),
});

interface PracticeSettingsProps {
  setLength: (length: number) => void;
  selectedPractice: practiceItem | null;
  length: number;
  lengthIndex: number;
}

const PracticeSettings: FC<PracticeSettingsProps> = ({
  selectedPractice,
  length,
  lengthIndex,
  setLength,
}) => (
  <SettingsWrapper>
    <LengthSelection>
      <LengthDecreaseButton onClick={() => setLength(lengthIndex - 1)} />
      <LengthDisplay>{length}</LengthDisplay>
      <LengthDecreaseButton onClick={() => setLength(lengthIndex - 1)} />
    </LengthSelection>
    <StartButton>Start</StartButton>
  </SettingsWrapper>
);

export default connect(rdxProps, rdxDispatch)(PracticeSettings);
