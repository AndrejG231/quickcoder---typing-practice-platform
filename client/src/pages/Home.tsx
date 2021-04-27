import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//queries

//Redux
import {
  setUserInfoAction,
  setAuthRefreshedAction,
  refreshAuthAction,
} from "../redux/actions/authActions";
import { ReduxState } from "../types/redux/ReduxState";

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

import { AnimeIn, AnimeOut } from "../redux/actions/animationActions";
import { useLogoutMutation, useUserInfoQuery } from "../graphql/fetching_auth";
import { userInfo } from "../types";
import { useQuery } from "@apollo/client";
import { userInfoQuery } from "../graphql/fetching_auth/useUserInfoQuery";

//Redux
const rdxState = (state: ReduxState) => {
  return {
    userInfo: state.UserInfo,
    awaitingAuth: state.checkAuth.awaitingAuth,
    isModalOpened: state.Animation.modal,
    onScreen: state.Animation.home,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    setAuthRefreshed: () => dispatch(setAuthRefreshedAction()),
    refreshAuth: () => dispatch(refreshAuthAction()),
    setUserInfo: (user: userInfo) => {
      dispatch(setUserInfoAction(user));
    },
    closeModal: () => dispatch(AnimeOut("modal")),
    animateOut: () => dispatch(AnimeOut("home")),
    animateIn: () => dispatch(AnimeIn("home")),
  };
};

//
interface HomeProps {
  refreshAuth: () => void;
  userInfo: userInfo | undefined;
  awaitingAuth: boolean;
  setUserInfo: (user: any /*UserInfo*/) => void;
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
  const { data, error, loading, refetch } = useQuery(userInfoQuery, {
    fetchPolicy: "network-only",
  });
  const [logout] = useLogoutMutation();

  const navigation = useHistory();

  useEffect(() => {
    if (!loading) {
      setUserInfo(data?.getSignedUser?.user ?? null);
    }
  }, [setUserInfo, data, loading]);

  useEffect(() => {
    if (awaitingAuth) {
      refetch();
      setAuthRefreshed();
    }
  }, [awaitingAuth, setAuthRefreshed]);

  console.log(awaitingAuth);
  console.log(data);

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
    logout();
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
