import React, { useEffect } from "react";
import { connect } from "react-redux";
import { UsTemplate } from "../data/KeyBoardTemplate";

//redux
import { setPracticeAction } from "../redux/actions/practiceActions";

//components
import KeyBoard from "../components/practice/KeyBoard";
import TextLine from "../components/practice/TextLine";

//styles
import "./Practice.scss";

//types
import { PracticeObjectT } from "../types/redux/PracticeT";
import { ReduxState } from "../types/redux/ReduxState";

//utilities
import HandlePracticeProgress from "../utilites/handlePracticeProgress";
import { Characters } from "../types/practice/KeyBoardT";

///////////////////
const TestPractice: PracticeObjectT = {
  errors: {},
  errorsCount: 0,
  id: 0,
  index: 0,
  lastError: "",
  isActive: true,
  isFinished: false,
  string:
    "Hello this is new test practi\
const TestPractice: PracticeObjectT = {'\
  errors: {},\
  errorsCount: 0,\
  id: 0,\
  index: 0,\
  lastError: \
  isActive: true,\
  isFinished: false,ce",
};
//////////////////

const rdxProps = (state: ReduxState) => {
  return {
    practice: state.Practice,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    setPracticeSession: (practice: PracticeObjectT) =>
      dispatch(setPracticeAction(practice)),
  };
};

const Practice: React.FC<any> = ({
  setPracticeSession,
  practice,
  validateKey,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || !practice.isActive) {
      return;
    }
    setPracticeSession(HandlePracticeProgress(e.key as Characters, practice));
  };

  useEffect(() => {
    setPracticeSession(TestPractice);
  }, [setPracticeSession]);

  return (
    <div className="practiceContainer" onKeyPress={handleKeyPress} tabIndex={1}>
      <TextLine />
      <KeyBoard
        width={window.innerWidth > 1280 ? 800 : 600}
        layout={UsTemplate}
        className="p-keyboard"
      />
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(Practice);
