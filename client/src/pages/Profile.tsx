import React, { FC } from "react";
import { Route, useHistory } from "react-router";

import { Routes, ProfileGrid, Overview } from "../components/profile";
import { ArrowButton, NavBar } from "../components/";

const Profile: FC = () => {
  const nav = useHistory();
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
          onClick={() => nav.push("/profile/unfinished/")}
          selected={nav.location.pathname.includes("unfinished")}
        >
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

export default Profile;
