import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import {
  Header,
  ClippedButton,
  HomeContainer,
  NavWrapper,
  UserButtonWrapper,
  UserAction,
  MenuItem,
} from "../components/home/";
import { ArrowButton } from "../components/";

import { reduxStore } from "../types";

import {
  animateIn,
  animateOut,
  setGlobalMessage,
  toggleAuthRefresh,
} from "../redux/actions/";

import { logout } from "../api/";

const rdxState = (state: reduxStore) => {
  return {
    userInfo: state.authentication.user,
    isModalOpened: state.animations.modal,
    isOnScreen: state.animations.home,
  };
};

const rdxDispatch = (dispatch: Dispatch) => {
  return {
    setGlobalMessage: (message: string) => dispatch(setGlobalMessage(message)),
    refreshAuth: () => dispatch(toggleAuthRefresh(true)),
    closeModal: () => dispatch(animateOut("modal")),
    animateOut: () => dispatch(animateOut("home")),
    animateIn: () => dispatch(animateIn("home")),
  };
};

const withRedux = connect(rdxState, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const Home: React.FC<props> = ({
  setGlobalMessage,
  refreshAuth,
  userInfo,
  isModalOpened,
  closeModal,
  isOnScreen,
  animateOut,
  animateIn,
}) => {
  const navigation = useHistory();

  //Home screen animation handler
  useEffect(() => {
    setTimeout(() => animateIn(), 10);
    return () => {
      animateOut();
    };
  }, [animateIn, animateOut]);

  //Routing function that provides quitting animation before rerouting
  const redirect = (to: string) => {
    if (isModalOpened) {
      closeModal();
      setTimeout(() => animateOut(), 200);
      setTimeout(() => navigation.push(to), 500);
    } else {
      animateOut();
      setTimeout(() => navigation.push(to), 250);
    }
  };

  //Logout handler
  const userLogout = () => {
    logout({
      onSuccess: () => {
        refreshAuth();
        setGlobalMessage("Successfully logged out.");
      },
      onError: () => setGlobalMessage("Action not successful, try again."),
    });
  };

  //When home screen modal is opened, animates it out before rerouting to main page
  const goHome = () => {
    if (isModalOpened) {
      closeModal();
      setTimeout(() => navigation.push("/home/"), 500);
    } else {
      navigation.push("/home/");
    }
  };

  return (
    <HomeContainer>
      {/* Top header bar */}
      <Header
        isOnScreen={isOnScreen}
        onUserClick={() => (userInfo ? redirect("/profile/overview/") : null)}
        onTitleClick={goHome}
        username={`${
          userInfo?.username
            ? userInfo.username.length > 7
              ? userInfo.username.slice(0, 7) + "..."
              : userInfo.username
            : "GUEST"
        }`}
      />

      {/* Leftside navigation */}
      <NavWrapper isOnScreen={isOnScreen}>
        <ClippedButton onClick={() => null}>
          <MenuItem>Typing test</MenuItem>
        </ClippedButton>
        <ClippedButton onClick={() => redirect("/practice_menu/")}>
          <MenuItem>Practice</MenuItem>
        </ClippedButton>
        <ClippedButton
          onClick={() => {
            userInfo
              ? redirect("/profile/overview/")
              : navigation.push("/home/login/");
          }}
        >
          <MenuItem>Profile</MenuItem>
        </ClippedButton>
        <ClippedButton onClick={() => redirect("/profile/settings/")}>
          <MenuItem>Settings</MenuItem>
        </ClippedButton>
        <ClippedButton onClick={() => null}>
          <MenuItem>Contribute</MenuItem>
        </ClippedButton>
      </NavWrapper>

      {/* Right side authentication navigation */}
      {userInfo?.username ? (
        <UserButtonWrapper isOnScreen={isOnScreen}>
          <ArrowButton width={100} onClick={userLogout} left>
            <UserAction>Logout</UserAction>
          </ArrowButton>
        </UserButtonWrapper>
      ) : (
        <UserButtonWrapper isOnScreen={isOnScreen}>
          <ArrowButton
            width={130}
            onClick={() => navigation.push("/home/signup/")}
            left
          >
            <UserAction>Sign Up</UserAction>
          </ArrowButton>
          <ArrowButton
            width={100}
            onClick={() => navigation.push("/home/login/")}
            left
          >
            <UserAction>Login</UserAction>
          </ArrowButton>
        </UserButtonWrapper>
      )}

      {/* TODO: Space for ads container */}
    </HomeContainer>
  );
};

export default withRedux(Home);
