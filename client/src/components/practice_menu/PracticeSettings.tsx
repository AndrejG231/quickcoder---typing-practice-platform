import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { createPractice } from "../../api";
import {
  selectPracticeLength,
  setPractice,
  toggleSelectionError,
  toggleSelectionLoading,
} from "../../redux/actions";
import { practiceObject, reduxStore } from "../../types";
import {
  LengthDecreaseButton,
  LengthIncreaseButton,
  LengthDisplay,
  LengthSelection,
  SettingsWrapper,
  StartButton,
  SchemeSelection,
  SelectionLabel,
} from "./practice_settings";

const rdxProps = (state: reduxStore) => {
  const category =
    // selected category name from menu and selected category index
    state.practiceMenu.length > 0
      ? state.practiceMenu[state.practiceSelection.selectedCategory].category
      : "";
  return {
    length: state.practiceSelection.length,
    category,
    practice: state.practiceSelection.selectedPractice,
    error: state.practiceSelection.error,
    loading: state.practiceSelection.loading,
  };
};

const rdxDispatch = (dispatch: Dispatch) => ({
  setLength: (length: number) => dispatch(selectPracticeLength(length)),
  setPractice: (practice: practiceObject) => dispatch(setPractice(practice)),
  setError: (error: boolean) => dispatch(toggleSelectionError(error)),
  setLoading: (loading: boolean) => dispatch(toggleSelectionLoading(loading)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const PracticeSettings: FC<props> = ({
  category,
  practice,
  length,
  setLength,
  error,
  loading,
  setError,
  setLoading,
}) => {
  const nav = useHistory();

  // Create practice, save it to state and reroute to practice session page handler
  const startPractice = () => {
    if (practice && category) {
      setLoading(true); //To prevent multiple request afer one not finished
      createPractice({
        category,
        index: practice.index,
        length: ~~length,
        onSuccess: (practice: practiceObject) => {
          setPractice(practice);
          setLoading(false);
          setError(false);
          nav.push(`/practice/in_progress/id=${practice.id}/`);
        },
        onError: () => {
          setLoading(false);
          setError(true);
        },
      });
    }
  };
  return (
    <SettingsWrapper>
      {/* Keyboard scheme selection */}
      {/* TODO: Load scheme from server, and add available schemes per practice */}
      <SelectionLabel htmlFor="scheme">Keyboard scheme:</SelectionLabel>
      <SchemeSelection name="scheme" defaultValue="en-us">
        <option value="en-us"> EN - US </option>
      </SchemeSelection>
      {/* Length selection */}
      <SelectionLabel>Length:</SelectionLabel>
      <LengthSelection>
        <LengthDecreaseButton size={22} onClick={() => setLength(-1)} />
        <LengthDisplay>{length}</LengthDisplay>
        <LengthIncreaseButton size={22} onClick={() => setLength(1)} />
      </LengthSelection>
      {/* Start button - do nothing when loading or error */}
      {error ? (
        <StartButton>Error..</StartButton>
      ) : loading ? (
        <StartButton>Loading...</StartButton>
      ) : category && practice ? (
        <StartButton onClick={startPractice}>Start</StartButton>
      ) : (
        <StartButton>Select practice first..</StartButton>
      )}
      <StartButton onClick={() => (!loading ? nav.push("/home/") : null)}>
        Go back home..
      </StartButton>
    </SettingsWrapper>
  );
};

export default withRedux(PracticeSettings);
