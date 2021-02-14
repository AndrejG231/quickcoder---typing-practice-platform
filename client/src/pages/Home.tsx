import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//queries
import { GetUserInfo, Logout } from "../graphql/auth";

//Utilities
import guestUser from "../utilites/guestUser";

//Redux
import { setUserInfoAction, logoutAction } from "../redux/actions";
import { ReduxState } from "../types/redux";

//types
import { UserInfo } from "../types/auth";

//Components
import Header from "../components/home/Header";
import KeyboardBG from "../components/home/KeyboardBG";
import ClippedButton from "../components/home/ClippedButton";
import ArrowButton from "../components/ArrowButton";

//Styles
import "../globalStyles/component.scss";
import "./Home.scss";

//Redux
const rdxState = (state: ReduxState) => {
  return {
    userInfo: state.UserInfo,
    isAuth: state.isAuth,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    setUserInfo: (user: UserInfo) => {
      dispatch(setUserInfoAction(user));
    },
    localLogout: () => {
      dispatch(logoutAction);
    },
  };
};

//

const Home: React.FC<any> = ({
  localLogout,
  userInfo,
  setUserInfo,
  isAuth,
}) => {
  const [logout] = Logout();
  const { data, loading, error, refetch } = GetUserInfo();

  const navigation = useHistory();

  useEffect(() => {
    refetch();
  }, [isAuth]);

  useEffect(() => {
    if (!loading) {
      if (error || data.getSignedUser.user === null) {
        localLogout();
        setUserInfo(guestUser);
      } else {
        setUserInfo(data.getSignedUser.user);
      }
    }
  }, [data, loading, error]);

  const handleLogout = () => {};

  return (
    <div className="homeContainer">
      <Header
        onUserClick={() => {
          navigation.push("/home/profile/");
        }}
        onTitleClick={() => navigation.push("/home/")}
        username={userInfo.username === "" ? "GUEST" : userInfo.username}
      />
      <div className="flexContainer">
        <ClippedButton>Typing test</ClippedButton>
        <ClippedButton>Practice</ClippedButton>
        <ClippedButton>Settings</ClippedButton>
      </div>
      {userInfo.username === "GUEST" ? (
        <>
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
          </ArrowButton>{" "}
        </>
      ) : (
        <ArrowButton
          className="signup button"
          bodyWidth="100px"
          onClick={async () => {
            await logout();
            localLogout();
          }}
          variant="left"
        >
          Logout
        </ArrowButton>
      )}
      <KeyboardBG className="keyboard-bg" />
    </div>
  );
};

export default connect(rdxState, rdxDispatch)(Home);
