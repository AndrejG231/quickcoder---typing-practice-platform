import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//queries

//Components
import {
  Header,
  ClippedButton,
  HomeContainer,
  NavWrapper,
  UserButtonWrapper,
  UserAction,
  MenuItem,
} from "../components/components_home";
import { ArrowButton } from "../components/";

import { reduxStore, userInfo } from "../types";

import {
  animateIn,
  animateOut,
  setUserInfo,
  toggleAuthRefresh,
} from "../redux/actions/";

//Redux
const rdxState = (state: reduxStore) => {
  return {
    userInfo: state.authentication.user,
    awaitingAuth: state.authentication.awaitingAuth,
    isModalOpened: state.animations.modal,
    onScreen: state.animations.home,
  };
};

const rdxDispatch = (dispatch: Dispatch) => {
  return {
    setAuthRefreshed: () => dispatch(toggleAuthRefresh(false)),
    refreshAuth: () => dispatch(toggleAuthRefresh(true)),
    setUserInfo: (user: userInfo | null) => {
      dispatch(setUserInfo(user));
    },
    closeModal: () => dispatch(animateOut("modal")),
    animateOut: () => dispatch(animateOut("home")),
    animateIn: () => dispatch(animateIn("home")),
  };
};

//
interface HomeProps {
  refreshAuth: () => void;
  userInfo: userInfo | null;
  awaitingAuth: boolean;
  setUserInfo: (user: userInfo | null) => void;
  isModalOpened: boolean;
  closeModal: () => void;
  onScreen: boolean;
  animateOut: () => void;
  animateIn: () => void;
  setAuthRefreshed: () => void;
}

const Home: React.FC<HomeProps> = ({
  refreshAuth,
  userInfo,
  setUserInfo,
  awaitingAuth,
  isModalOpened,
  closeModal,
  onScreen,
  animateOut,
  animateIn,
  setAuthRefreshed,
}) => {
  const navigation = useHistory();

  useEffect(() => {
    //Animation
    animateIn();
    return () => animateOut();
  }, [animateIn, animateOut]);

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

  const userLogout = () => {
    setUserInfo(null);
  };

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
      <Header
        onScreen={onScreen}
        onUserClick={() => {
          navigation.push("/home/profile/");
        }}
        onTitleClick={goHome}
        username={`${
          userInfo?.username
            ? userInfo.username.length > 7
              ? userInfo.username.slice(0, 7) + "..."
              : userInfo.username
            : "GUEST"
        }`}
      />
      <NavWrapper isOnScreen={onScreen}>
        <ClippedButton onClick={() => null}>
          <MenuItem>Typing test</MenuItem>
        </ClippedButton>
        <ClippedButton onClick={() => redirect("/practice_menu/")}>
          <MenuItem>Practice</MenuItem>
        </ClippedButton>
        <ClippedButton onClick={() => null}>
          <MenuItem>Settings</MenuItem>
        </ClippedButton>
        <ClippedButton onClick={() => null}></ClippedButton>
        <ClippedButton onClick={() => null}></ClippedButton>
      </NavWrapper>
      {userInfo?.username ? (
        <UserButtonWrapper isOnScreen={onScreen}>
          <ArrowButton width={100} onClick={userLogout} left>
            <UserAction>Logout</UserAction>
          </ArrowButton>
        </UserButtonWrapper>
      ) : (
        <UserButtonWrapper isOnScreen={onScreen}>
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
    </HomeContainer>
  );
};

export default connect(rdxState, rdxDispatch)(Home);
