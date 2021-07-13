import React, { FC, useCallback, useState } from "react";

import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { Route } from "react-router-dom";

import { reduxStore } from "../types";
import { routes } from "../static";
import { Notification } from "../components/typing_test";

const stateToProps = (state: reduxStore) => {
  return {
    user: state.authentication.user,
  };
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const withRedux = connect(stateToProps, dispatchToProps);

type props = ConnectedProps<typeof withRedux>;

const TypingTest: FC<props> = ({ user }) => {
  // State for preventing multiple fetches
  const [loadingTest, setLoadingTest] = useState(false);

  const loadTest = () => {
    // setLoadingTest(true)
    // Fetch test session
    // Save test session into redux
    // GoTo typingTestOngoing
    // setLoadingTest(false)
  };

  return (
    <>
      <Route exact path={routes.typingTestNotify}>
        <Notification
          acceptClick={loadingTest ? () => null : loadTest}
          auth={Boolean(user)}
        />
      </Route>
    </>
  );
};

export default withRedux(TypingTest);
