import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import PracticeMenu from "./pages/PracticeMenu";
import Practice from "./pages/Practice";
import PracticeSummary from "./pages/PracticeSummary";
import LeaderBoard from "./pages/LeaderBoard";

//modals
import Login from "./modals/Login";
import Register from "./modals/Register";
import Profile from "./modals/Profile";
import ForgotPassword from "./modals/ForgotPassword";
import ChangeTokenPassword from "./modals/ChangeTokenPassword";
import ChangeKnownPassword from "./modals/ChangeKnownPassword";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={() => <Home />} />
      <Route path="/home/" component={() => <Home />} />
      <Route exact path="/home/profile/" component={() => <Profile />} />
      <Route exact path="/home/login/" component={() => <Login />} />
      <Route exact path="/home/signup/" component={() => <Register />} />
      <Route
        exact
        path="/home/forgot_password/"
        component={() => <ForgotPassword />}
      />
      <Route
        exact
        path="/home/change_password_w_token/:token/"
        component={() => <ChangeTokenPassword />}
      />
      <Route
        exact
        path="/home/change_known_password/"
        component={() => <ChangeKnownPassword />}
      />
      <Route
        exact
        path="/practice/in_progress/id=:id/"
        component={() => <Practice />}
      />
      <Route
        exact
        path="/practice/finished/id=:id"
        component={() => <PracticeSummary />}
      />
      <Route
        exact
        path="/leaderboard/c=:category/i=:index/"
        component={() => <LeaderBoard />}
      />
      <Route exact path="/practice_menu/" component={() => <PracticeMenu />} />
    </BrowserRouter>
  );
};

export default Routes;
