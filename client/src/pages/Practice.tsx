import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

//components
import KeyBoard from "../components/practice/KeyBoard";
import TextLine from "../components/practice/TextLine";
import FingerIndex from "../components/practice/FingerIndex";
import LiveStats from "../components/practice/LiveStats";

//utilities
import HandlePracticeProgress from "../utilites/handlePracticeProgress";
import { practiceObject, reduxStore } from "../types";
import { setPractice } from "../redux/actions";
import { createPractice } from "../api";

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
  }, []);

  // const [updatePractice] = [(op: any) => null];
  // const handleKeyPress = (e: KeyboardEvent) => {};

  // const handleUpdatePractice = async () => {};
  if (!practice) {
    return <div>HI</div>;
  }

  return (
    <div className="practiceContainer" tabIndex={1}>
      {JSON.stringify(practice)}
      <p>{practice.string}</p>
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
