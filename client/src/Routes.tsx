import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import DisplayTest from "./test/DisplayTest";
//pages
import Home from "./pages/Home";

//modals
import Login from "./modals/Login";
import Register from "./modals/Register";
import Profile from "./modals/Profile";
import ForgotPassword from "./modals/ForgotPassword";

const Routes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={() => <Home />} />
      <Route path="/home/" component={() => <Home />} />
      <Route exact path="/home/profile/" component={() => <Profile />} />
      <Route exact path="/home/login/" component={() => <Login />} />
      <Route exact path="/home/signup/" component={() => <Register />} />
      <Route exact path="/home/forgot_password/" component={() => <ForgotPassword/>} />
      <Route exact path="/dt" component={() => <DisplayTest />} />
    </BrowserRouter>
  );
};

export default Routes;
