import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";

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
      <Route path="/home/" component={() => <Home />} />I
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
    </BrowserRouter>
  );
};

export default Routes;
