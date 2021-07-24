import React, { FC, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Route, useHistory } from "react-router-dom";

import { routes } from "../static";

import {
  Routes,
  ProfileGrid,
  UnfinishedCount,
  Unfinished,
  History,
  Overview,
} from "../components/profile";
import { ArrowButton, NavBar } from "../components";
import { getUnfinishedPracticesCount } from "../api";
import { reduxStore } from "../types";
import { setUnfinishedPracticesCount } from "../redux/actions";

// SubRoutes

const rdxProps = (state: reduxStore) => ({
  unfinishedCount: state.profile.unfinishedCount,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setUnfinishedCount: (count: number) =>
    dispatch(setUnfinishedPracticesCount(count)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Profile: FC<props> = ({ setUnfinishedCount, unfinishedCount }) => {
  const nav = useHistory();
  const [route, setRoute] = useState<string>(nav.location.pathname);

  const redirect = (path: string) => {
    nav.push(path);
    setRoute(path);
  };

  useEffect(() => {
    if (unfinishedCount < 1) {
      getUnfinishedPracticesCount({
        onSuccess: setUnfinishedCount,
        onError: () => null,
      });
    }
  }, [unfinishedCount, setUnfinishedCount]);

  return (
    <ProfileGrid>
      {/* Navigation */}
      <NavBar>
        <ArrowButton
          onClick={() => redirect(routes.profile)}
          selected={route === routes.profile}
        >
          Overview
        </ArrowButton>
        <ArrowButton
          onClick={() => redirect(routes.profileHistory)}
          selected={route === routes.profileHistory}
        >
          History
        </ArrowButton>
        <ArrowButton
          relative
          onClick={() => redirect(routes.profileUnfinished)}
          selected={route === routes.profileUnfinished}
        >
          {/* Count of unfinished practices, displayed if there are any */}
          {unfinishedCount ? (
            <UnfinishedCount>{unfinishedCount}</UnfinishedCount>
          ) : null}
          Unfinished
        </ArrowButton>

        <ArrowButton onClick={() => redirect(routes.home)}>Home</ArrowButton>
      </NavBar>
      {/* Nested routes */}
      <Routes>
        <Route exact path={routes.profile}>
          <Overview />
        </Route>
        <Route path={routes.profileHistory}>
          <History />
        </Route>
        <Route path={routes.profileUnfinished}>
          <Unfinished />
        </Route>
      </Routes>
    </ProfileGrid>
  );
};

export default withRedux(Profile);
