import React, { FC, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Route, useHistory } from "react-router";

import {
  Routes,
  ProfileGrid,
  Overview,
  History,
  Unfinished,
  UnfinishedCount,
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
          onClick={() => nav.push("/profile/")}
          selected={nav.location.pathname === "/profile/"}
        >
          Overview
        </ArrowButton>
        <ArrowButton
          onClick={() => nav.push("/profile/history/")}
          selected={nav.location.pathname.includes("history")}
        >
          History
        </ArrowButton>
        <ArrowButton
          relative
          onClick={() => nav.push("/profile/unfinished/")}
          selected={nav.location.pathname.includes("unfinished")}
        >
          {/* Count of unfinished practices, displayed if there are any */}
          {unfinishedCount ? (
            <UnfinishedCount>{unfinishedCount}</UnfinishedCount>
          ) : null}
          Unfinished
        </ArrowButton>
        <ArrowButton
          onClick={() => nav.push("/profile/settings/")}
          selected={nav.location.pathname.includes("settings")}
        >
          Settings
        </ArrowButton>
        <ArrowButton onClick={() => nav.push("/home/")}>Home</ArrowButton>
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
          <div>Settings</div>
        </Route>
      </Routes>
    </ProfileGrid>
  );
};

export default withRedux(Profile);
