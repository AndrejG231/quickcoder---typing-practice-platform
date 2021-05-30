import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { reduxStore } from "../types";
import { Route, useHistory } from "react-router";

import { Routes, ProfileGrid } from "../components/profile";
import { ArrowButton, NavBar } from "../components/";

const rdxProps = (state: reduxStore) => ({});

const rdxDispatch = (dispatch: Dispatch) => ({});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Profile: FC<props> = () => {
  const nav = useHistory();
  return (
    <ProfileGrid>
      {/* Navigation */}
      <NavBar>
        <ArrowButton onClick={() => nav.push("/profile/overview/")}>
          Overview
        </ArrowButton>
        <ArrowButton onClick={() => nav.push("/profile/history/")}>
          History
        </ArrowButton>
        <ArrowButton onClick={() => nav.push("/profile/unfinished/")}>
          Unfinished
        </ArrowButton>
        <ArrowButton onClick={() => nav.push("/profile/settings/")}>
          Settings
        </ArrowButton>
        <ArrowButton onClick={() => nav.push("/home/")}>
          Home
        </ArrowButton>
      </NavBar>
      {/* Nested routes */}
      <Routes>
        <Route path="/profile/overview/">
          <div>Overview</div>
        </Route>
        <Route path="/profile/history/">
          <div>History</div>
        </Route>
        <Route path="/profile/unfinished/">
          <div>Unfinished</div>
        </Route>
        <Route path="/profile/settings/">
          <div>Settings</div>
        </Route>
      </Routes>
    </ProfileGrid>
  );
};

export default withRedux(Profile);
