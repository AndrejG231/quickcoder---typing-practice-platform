import React from "react";
import DisplayTest from "./test/DisplayTest";
import Home from "./pages/Home";
import {BrowserRouter, Route} from "react-router-dom";


const Main: React.FC<{}> = () => {
  return (
    <BrowserRouter>
    <div>
      <Route exact path="/" component={() => <Home/>}/>
      <Route exact path="/dt" component={() => <DisplayTest />}/>
    </div>
    </BrowserRouter>
  );
};

export default Main;
