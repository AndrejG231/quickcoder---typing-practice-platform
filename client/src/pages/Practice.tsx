import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

//components
import KeyBoard from "../components/practice/KeyBoard";
import TextLine from "../components/practice/TextLine";
import FingerIndex from "../components/practice/FingerIndex";
import LiveStats from "../components/practice/LiveStats";

//utilities
import HandlePracticeProgress from "../utilites/handlePracticeProgress";

const rdxProps = () => {
  return {};
};

const rdxDispatch = (dispatch: any) => {
  return {};
};

const withRedux = connect(rdxProps, rdxDispatch);

interface PracticeProps {}

const Practice: React.FC<PracticeProps> = ({}) => {
  const navigator = useHistory();
  const {
    practiceCode,
    practiceLength,
  }: {
    practiceCode: string;
    practiceLength: string;
  } = useParams();

  const [updatePractice] = [(op: any) => null];

  const loadPractice = async () => {};

  const handleKeyPress = (e: KeyboardEvent) => {};

  const handleUpdatePractice = async () => {};

  return (
    <div className="practiceContainer" tabIndex={1}>
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
    </div>
  );
};

export default withRedux(Practice);
