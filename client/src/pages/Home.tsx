import React from "react";
import { useHistory } from "react-router-dom";

//Components
import Header from "../components/home/Header";
import KeyboardBG from "../components/home/KeyboardBG";
import ClippedButton from "../components/home/ClippedButton";
import ArrowButton from "../components/ArrowButton";

//Styles
import "../globalStyles/component.css";
import "./Home.css";

const Home = () => {
  const navigation = useHistory();
  return (
    <div className="homeContainer">
      <Header
        onUserClick={() => {
          navigation.push("/home/profile/");
        }}
        onTitleClick={() => navigation.push("/home/")}
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
        onClick={() => {
          navigation.push("/home/signup/");
        }}
        variant="left"
      >
        Sign Up
      </ArrowButton>
      <ArrowButton
        className="login button"
        bodyWidth="100px"
        onClick={() => {
          navigation.push("/home/login/");
        }}
        variant="left"
      >
        Login
      </ArrowButton>
      <KeyboardBG className="keyboard-bg" />
    </div>
  );
};

export default Home;
