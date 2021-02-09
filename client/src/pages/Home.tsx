import React from "react";

//Components
import Header from "../components/home/Header";
import KeyboardBG from "../components/home/KeyboardBG";
import ClippedButton from "../components/home/ClippedButton";
import ArrowButton from "../components/ArrowButton";

//Styles
import "../globalStyles/component.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <Header
        onUserClick={() => console.log("Title Click")}
        onTitleClick={() => console.log("Title Click")}
        username="USERNAME"
      />
      <div className="flexContainer">
        <ClippedButton>Typing test</ClippedButton>
        <ClippedButton>Practice</ClippedButton>
        <ClippedButton>Settings</ClippedButton>
      </div>
      <ArrowButton
        className="signup button"
        bodyWidth="120px"
        onClick={() => console.log("Clicked")}
        variant="left"
      >
        Sign Up
      </ArrowButton>
      <ArrowButton
        className="login button"
        bodyWidth="100px"
        onClick={() => console.log("Clicked")}
        variant="left"
      >
        Login
      </ArrowButton>
      <KeyboardBG className="keyboard-bg" />
    </div>
  );
};

export default Home;
