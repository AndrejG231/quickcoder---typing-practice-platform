import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { UsTemplate } from "../data/KeyBoardTemplate";

//redux
import {
  setPracticeAction,
  resetPracticeOffset,
  resetPracticeSession,
} from "../redux/actions/practiceActions";

//components
import KeyBoard from "../components/practice/KeyBoard";
import TextLine from "../components/practice/TextLine";
import FingerIndex from "../components/practice/FingerIndex";
import LiveStats from "../components/practice/LiveStats";

//styles

//types
import { PracticeObjectT } from "../types/practice/PracticeT";
import { ReduxState } from "../types/redux/ReduxState";

//utilities
import HandlePracticeProgress from "../utilites/handlePracticeProgress";
import { Characters } from "../types/practice/KeyBoardT";
import getClientParam from "../utilites/clientParameter";

import {
  practiceStatsQuery,
  useCreatePracticeSession,
} from "../graphql/practice";
import { setTimeout } from "timers";

const rdxProps = (state: ReduxState) => {
  return {
    practice: state.Practice,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    setPracticeSession: (practice: PracticeObjectT) =>
      dispatch(setPracticeAction(practice)),
    resetPractice: () => {
      dispatch(resetPracticeSession());
      dispatch(resetPracticeOffset());
    },
  };
};

interface PracticeProps {
  setPracticeSession: (practice: PracticeObjectT) => void;
  resetPractice: () => void;
  practice: PracticeObjectT;
}

const Practice: React.FC<PracticeProps> = ({
  setPracticeSession,
  resetPractice,
  practice,
}) => {
  const navigator = useHistory();
  const {
    practiceCode,
    practiceLength,
  }: {
    practiceCode: string;
    practiceLength: string;
  } = useParams();

  const [createPractice, { data, error, loading }] = useCreatePracticeSession();
  const [updatePractice] = mutation;

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

  const handleUpdatePractice = async () => {
    const result = await validate(
      updatePractice({
        variables: {
          practiceId: practice.id,
          practiceUpdateFields: {
            index: practice.index,
            errors_count: practice.errorsCount,
            errors: JSON.stringify(practice.errors),
            is_finished: true,
            time_spent: new Date().getTime() - practice.startTime,
          },
        },
      })
    );
    if (result.success) {
      navigator.push(`/practice/finished/id=${practice.id}`);
    } else {
      navigator.push(`/server-error/`);
    }
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
        startTime: -1,
      });
    }
  }, [data, loadPractice, setPracticeSession]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  });

  useEffect(() => {
    if (practice.isFinished) {
      handleUpdatePractice();
      setTimeout(() => resetPractice(), 1000);
    }
  }, [practice]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="practiceContainer" tabIndex={1}>
      <FingerIndex width={window.innerWidth > 1580 ? 1000 : 800} />
      <TextLine />
      <KeyBoard
        width={window.innerWidth > 1580 ? 800 : 600}
        layout={UsTemplate}
        className="p-keyboard"
      />
      <LiveStats
        width={window.innerWidth > 1580 ? 1000 : 800}
        startTime={practice.startTime}
        characters={practice.index}
        errors={Object.keys(practice.errors).length}
      />
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(Practice);
