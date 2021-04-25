import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//queries
import { GetUserInfo, Logout } from "../graphql/auth";

//Utilities
import guestUser from "../utilites/guestUser";

//Redux
import {
  setUserInfoAction,
  refreshAuthAction,
} from "../redux/actions/authActions";
import { ReduxState } from "../types/redux/ReduxState";

//types
import { UserInfo } from "../types/graphql/AuthMutationsT";

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
import { AnimeOut } from "../redux/actions/animationActions";

//Redux
const rdxState = (state: ReduxState) => {
  return {
    userInfo: state.UserInfo,
    AuthCount: state.AuthCount.AuthCount,
    isModalOpened: state.Animation.modal,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    refreshAuth: () => dispatch(refreshAuthAction()),
    setUserInfo: (user: UserInfo) => {
      dispatch(setUserInfoAction(user));
    },
    closeModal: () => dispatch(AnimeOut("modal")),
  };
};

//
interface HomeProps {
  refreshAuth: () => void;
  userInfo: UserInfo;
  AuthCount: number;
  setUserInfo: (user: UserInfo) => void;
  isModalOpened: boolean;
  closeModal: () => void;
}

const Home: React.FC<HomeProps> = ({
  refreshAuth,
  userInfo,
  setUserInfo,
  AuthCount,
  isModalOpened,
  closeModal,
}) => {
  const [logout] = Logout();
  const { data, loading, error, refetch } = GetUserInfo();

  const navigation = useHistory();

  useEffect(() => {
    if (AuthCount > 0) {
      refetch();
    }
  }, [AuthCount, refetch]);

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
      setTimeout(() => navigation.push(to), 500);
    } else {
      setTimeout(() => navigation.push(to), 150);
    }
  };

  const userLogout = async () => {
    await logout();
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
      <NavWrapper>
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
        <UserButtonWrapper>
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
        <UserButtonWrapper>
          <ArrowButton width={100} onClick={userLogout} left>
            <UserAction>Logout</UserAction>
          </ArrowButton>
        </UserButtonWrapper>
      )}
    </HomeContainer>
  );
};

export default connect(rdxState, rdxDispatch)(Home);
