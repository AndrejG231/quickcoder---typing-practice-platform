import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { PracticeObjectT } from "../types/practice/PracticeT";
import { ReduxState } from "../types/redux/ReduxState";

//utilities
import HandlePracticeProgress from "../utilites/handlePracticeProgress";
import { Characters } from "../types/practice/KeyBoardT";

import { useCreatePracticeSession } from "../graphql/practice";
import getClientParam from "../utilites/clientParameter";
import { create } from "domain";

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

const Practice: React.FC<any> = ({ setPracticeSession, practice }) => {
  const {
    practiceCode,
    practiceLength,
  }: {
    practiceCode: string;
    practiceLength: string;
  } = useParams();

  const [createPractice, { data, error, loading }] = useCreatePracticeSession();

  const loadPractice = async () => {
    await createPractice({
      variables: {
        practiceName: practiceCode,
        clientParameter: getClientParam(),
        length: parseInt(practiceLength),
      },
    });
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" || !practice.isActive) {
      return;
    }
    setPracticeSession(HandlePracticeProgress(e.key as Characters, practice));
  };

  useEffect(() => {
    if (!data) {
      loadPractice();
    }
    if (data?.createPractice.practice && practice.id === -1) {
      const newPractice = data.createPractice.practice;
      setPracticeSession({
        errors: {},
        errorsCount: newPractice.errors_count,
        lastError: "",
        id: newPractice.id,
        index: newPractice.index,
        isFinished: false,
        isActive: true,
        string: newPractice.string,
        timeSpent: 0,
      });
    }
  }, [data, loadPractice, setPracticeSession]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="practiceContainer" tabIndex={1}>
      <TextLine />
      <KeyBoard
        width={window.innerWidth > 1580 ? 800 : 600}
        layout={UsTemplate}
        className="p-keyboard"
      />
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(Practice);
