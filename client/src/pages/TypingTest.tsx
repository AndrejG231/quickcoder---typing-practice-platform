import React, { FC, useCallback, useState } from "react";

import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { Route, useHistory } from "react-router-dom";

import { finishedTestStats, practiceObject, reduxStore } from "../types";
import { routes } from "../static";
import { Notification, TestSummary } from "../components/typing_test";
import { resetPractice, setPractice } from "../redux/actions";
import { createTypingTest, finishTypingTest } from "../api";
import Practice from "./Practice";

const stateToProps = (state: reduxStore) => {
  return {
    user: state.authentication.user,
  };
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    setPractice: (practice: practiceObject) => dispatch(setPractice(practice)),
    resetPractice: () => dispatch(resetPractice()),
  };
};

const withRedux = connect(stateToProps, dispatchToProps);

type props = ConnectedProps<typeof withRedux>;

const TypingTest: FC<props> = ({ user, setPractice, resetPractice }) => {
  // State for preventing multiple fetches
  const [loadingTest, setLoadingTest] = useState(false);
  const [resultData, setResultData] = useState<null | finishedTestStats>(null);
  const nav = useHistory();

  const loadTest = () => {
    if (!loadingTest) {
      setLoadingTest(true);
      createTypingTest({
        onError() {
          setLoadingTest(false);
          // DO SOME ERROR LOGS
        },
        onSuccess(practice) {
          setPractice(practice);
          nav.push(routes.typingTestRun);
          setLoadingTest(false);
        },
      });
    }
  };

  const handleFinishTypingTest = (practice: practiceObject) => {
    resetPractice();
    nav.push(routes.typingTestFinished);
    finishTypingTest({
      onError: () => null,
      onSuccess(data) {
        setResultData(data);
      },
      practiceId: practice.id,
      practiceUpdateFields: {
        index: practice.index,
        errors: JSON.stringify(practice.errors),
        time_spent:
          practice.time_spent + new Date().getTime() - practice.start_time,
      },
    });
    // Finish test mutation
    //  Retrieve test info
  };

  return (
    <>
      <Route exact path={routes.typingTestNotify}>
        <Notification
          acceptClick={loadingTest ? () => null : loadTest}
          auth={Boolean(user)}
        />
      </Route>
      <Route exact path={routes.typingTestRun}>
        <Practice typingTest={(practice) => handleFinishTypingTest(practice)} />
      </Route>
      <Route exact path={routes.typingTestFinished}>
        {resultData ? <TestSummary data={resultData} /> : <div>Loading..</div>}
      </Route>
    </>
  );
};

export default withRedux(TypingTest);
