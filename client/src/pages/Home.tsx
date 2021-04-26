import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//queries

//Utilities
import guestUser from "../utilites/guestUser";

//Redux
import {
  setUserInfoAction,
  refreshAuthAction,
} from "../redux/actions/authActions";
import { ReduxState } from "../types/redux/ReduxState";

//types

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
import ArrowButton from "../components/ArrowButton";
import { AnimeIn, AnimeOut } from "../redux/actions/animationActions";

//Redux
const rdxState = (state: ReduxState) => {
  return {
    userInfo: state.UserInfo,
    authNotRefreshed: state.checkAuth.awaitingAuth,
    isModalOpened: state.Animation.modal,
    onScreen: state.Animation.home,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    refreshAuth: () => dispatch(refreshAuthAction()),
    setUserInfo: (user: any) => null, //(user: UserInfo) => {
    //   dispatch(setUserInfoAction(user));
    // },
    closeModal: () => dispatch(AnimeOut("modal")),
    animateOut: () => dispatch(AnimeOut("home")),
    animateIn: () => dispatch(AnimeIn("home")),
  };
};

//
interface HomeProps {
  refreshAuth: () => void;
  userInfo: any /*UserInfo*/;
  authNotRefreshed: boolean;
  setUserInfo: (user: any /*UserInfo*/) => void;
  isModalOpened: boolean;
  closeModal: () => void;
  onScreen: boolean;
  animateOut: () => void;
  animateIn: () => void;
}

const Home: React.FC<HomeProps> = ({
  refreshAuth,
  userInfo,
  setUserInfo,
  authNotRefreshed,
  isModalOpened,
  closeModal,
  onScreen,
  animateOut,
  animateIn,
}) => {
  const [logout] = ["hi"]; //Logout();
  const { data, loading, error, refetch }: any = {}; //GetUserInfo();

  const navigation = useHistory();

  useEffect(() => {
    animateIn();
    return () => animateOut();
  }, [animateIn, animateOut]);

  useEffect(() => {
    if (!loading && data) {
      if (error || data.getSignedUser.user === null) {
        setUserInfo(guestUser);
      } else {
        setUserInfo(data.getSignedUser.user);
      }
    }
  }, [data, loading, error, setUserInfo]);

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

  const userLogout = async () => {
    // await logout();
    refreshAuth();
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
          userInfo.username === ""
            ? "GUEST"
            : userInfo.username.length > 7
            ? userInfo.username.slice(0, 7) + "..."
            : userInfo.username
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
      {userInfo ? (
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
      ) : (
        <UserButtonWrapper isOnScreen={onScreen}>
          <ArrowButton width={100} onClick={userLogout} left>
            <UserAction>Logout</UserAction>
          </ArrowButton>
        </UserButtonWrapper>
      )}
    </HomeContainer>
  );
};

export default connect(rdxState, rdxDispatch)(Home);
