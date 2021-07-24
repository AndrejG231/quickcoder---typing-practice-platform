import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { routes } from "./static";

//pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PracticeMenu from "./pages/PracticeMenu";
import Practice from "./pages/Practice";
import PracticeSummary from "./pages/PracticeSummary";
import LeaderBoard from "./pages/LeaderBoard";
import TypingTest from "./pages/TypingTest";
import Settings from "./pages/Settings";

//modals
import Login from "./modals/Login";
import Register from "./modals/Register";
import ForgotPassword from "./modals/ForgotPassword";
import ChangeTokenPassword from "./modals/ChangeTokenPassword";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path={routes.default} component={() => <Home />} />
      <Route path={routes.home} component={() => <Home />} />
      <Route path={routes.profile} component={() => <Profile />} />
      <Route exact path={routes.login} component={() => <Login />} />
      <Route exact path={routes.register} component={() => <Register />} />
      <Route
        exact
        path={routes.recoverPass}
        component={() => <ForgotPassword />}
      />
      <Route
        exact
        path={routes.recoverPassWithToken(":token")}
        component={() => <ChangeTokenPassword />}
      />
      <Route
        exact
        path={routes.runningPractice(":id")}
        component={() => <Practice />}
      />
      <Route
        exact
        path={routes.finishedPractice(":id")}
        component={() => <PracticeSummary />}
      />
      <Route
        exact
        path={routes.leaderBoard(":category", ":index")}
        component={() => <LeaderBoard />}
      />
      <Route
        exact
        path={routes.practiceMenu}
        component={() => <PracticeMenu />}
      />
      <Route path={routes.settings} component={() => <Settings />} />
      <Route path={routes.typingTest} component={() => <TypingTest />} />
    </BrowserRouter>
  );
};

export default Routes;
