import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import { loadMenu, setGlobalMessage } from "./redux/actions";
import { practiceMenu } from "./types";
import { getMenu } from "./api";
import { reduxStore } from "./types";

//pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PracticeMenu from "./pages/PracticeMenu";
import Practice from "./pages/Practice";
import PracticeSummary from "./pages/PracticeSummary";
import LeaderBoard from "./pages/LeaderBoard";

//modals
import Login from "./modals/Login";
import Register from "./modals/Register";
import ForgotPassword from "./modals/ForgotPassword";
import ChangeTokenPassword from "./modals/ChangeTokenPassword";
import ChangeKnownPassword from "./modals/ChangeKnownPassword";

const rdxProps = (state: reduxStore) => ({
  menu: state.practiceMenu,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setMenu: (menu: practiceMenu) => dispatch(loadMenu(menu)),
  setPopUp: (message: string) => dispatch(setGlobalMessage(message)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Routes: React.FC<props> = ({ menu, setMenu, setPopUp }) => {
  // Global data fetching - menu
  useEffect(() => {
    if (!menu) {
      getMenu({
        onSuccess: (menu) => {
          setMenu(menu);
        },
        onError: () =>
          setPopUp(
            "Error: could not load neccessary data. Try refreshing page to fix this problem."
          ),
      });
    }
  }, [menu]);

  return (
    <BrowserRouter>
      <Route exact path="/" component={() => <Home />} />
      <Route path="/home/" component={() => <Home />} />
      <Route path="/profile/" component={() => <Profile />} />
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

export default withRedux(Routes);
