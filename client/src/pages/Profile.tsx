import React, { FC, useEffect, useLayoutEffect, useState } from "react";
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
import {
  animateIn,
  animateOut,
  setUnfinishedPracticesCount,
} from "../redux/actions";

// SubRoutes

const rdxProps = (state: reduxStore) => ({
  unfinishedCount: state.profile.unfinishedCount,
  containerAnimation: state.animations.profileContainer,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setUnfinishedCount: (count: number) =>
    dispatch(setUnfinishedPracticesCount(count)),
  animateInOut: (out: boolean) =>
    dispatch(
      out ? animateOut("profileContainer") : animateIn("profileContainer")
    ),
  animateInOutChild: (out: boolean) =>
    dispatch(out ? animateOut("profileChild") : animateIn("profileChild")),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Profile: FC<props> = ({
  setUnfinishedCount,
  unfinishedCount,
  animateInOut,
  animateInOutChild,
  containerAnimation,
}) => {
  const nav = useHistory();
  const [route, setRoute] = useState<string>(nav.location.pathname);
  const [routeChange, setRouteChange] = useState(false);

  const redirect = (path: string) => {
    if (route !== path && !routeChange) {
      setRouteChange(true);
      // To prevent from multiple clicks animation skipping
      animateInOutChild(true);
      setTimeout(() => {
        nav.push(path);
        setRoute(path);
        setTimeout(() => {
          animateInOutChild(false);
          setRouteChange(false);
        }, 30);
        // Animating child inside same time as route changes causes aniumation cancelling
      }, 300);
    }
  };

  const redirectOut = (path: string) => {
    animateInOut(true);
    animateInOutChild(true);
    setTimeout(() => {
      nav.push(path);
    }, 200);
  };

  useEffect(() => {
    if (unfinishedCount < 1) {
      getUnfinishedPracticesCount({
        onSuccess: setUnfinishedCount,
        onError: () => null,
      });
    }
    setTimeout(() => {
      animateInOut(false);
      animateInOutChild(false);
    }, 5);
    return () => {
      animateInOut(true);
      animateInOutChild(true);
    };
  }, [unfinishedCount, setUnfinishedCount]);

  useLayoutEffect(() => {}, []);

  return (
    <ProfileGrid>
      {/* Navigation */}
      <NavBar isOnScreen={containerAnimation}>
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

        <ArrowButton onClick={() => redirectOut(routes.home)}>Home</ArrowButton>
      </NavBar>
      {/* Nested routes */}
      <Routes>
        <Route exact path={routes.profile}>
          <Overview />
        </Route>
        <Route path={routes.profileHistory}>
          <History redirectOut={redirectOut} />
        </Route>
        <Route path={routes.profileUnfinished}>
          <Unfinished redirectOut={redirectOut} />
        </Route>
      </Routes>
    </ProfileGrid>
  );
};

export default withRedux(Profile);
