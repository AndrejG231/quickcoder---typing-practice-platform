import React, { FC, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Route, useHistory } from "react-router-dom";

import {
  Routes,
  ProfileGrid,
  Overview,
  History,
  Unfinished,
  UnfinishedCount,
  Settings,
} from "../components/profile";
import { ArrowButton, NavBar } from "../components/";
import { getUnfinishedPracticesCount } from "../api";
import { reduxStore } from "../types";
import { setUnfinishedPracticesCount } from "../redux/actions";

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
          onClick={() => redirect("/profile/")}
          selected={route === "/profile/"}
        >
          Overview
        </ArrowButton>
        <ArrowButton
          onClick={() => redirect("/profile/history/")}
          selected={route.includes("history")}
        >
          History
        </ArrowButton>
        <ArrowButton
          relative
          onClick={() => redirect("/profile/unfinished/")}
          selected={route.includes("unfinished")}
        >
          {/* Count of unfinished practices, displayed if there are any */}
          {unfinishedCount ? (
            <UnfinishedCount>{unfinishedCount}</UnfinishedCount>
          ) : null}
          Unfinished
        </ArrowButton>
        <ArrowButton
          onClick={() => redirect("/profile/settings/")}
          selected={route.includes("settings")}
        >
          Settings
        </ArrowButton>
        <ArrowButton onClick={() => redirect("/home/")}>Home</ArrowButton>
      </NavBar>
      {/* Nested routes */}
      <Routes>
        <Route exact path="/profile/">
          <Overview />
        </Route>
        <Route path="/profile/history/">
          <History />
        </Route>
        <Route path="/profile/unfinished/">
          <Unfinished />
        </Route>
        <Route path="/profile/settings/">
          <Settings />
        </Route>
      </Routes>
    </ProfileGrid>
  );
};

export default withRedux(Profile);
