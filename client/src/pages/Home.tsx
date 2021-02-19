import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//queries
import { GetUserInfo, Logout } from "../graphql/auth";

//Utilities
import guestUser from "../utilites/guestUser";

//Redux
import { setUserInfoAction, logoutAction } from "../redux/actions/authActions";
import {
  ToggleAnimationIn,
  ToggleAnimationOut,
} from "../redux/actions/animationActions";
import { ReduxState } from "../types/redux/ReduxState";

//types
import { UserInfo } from "../types/graphql/AuthMutationsT";

//Components
import Header from "../components/home/Header";
import KeyboardBG from "../components/home/KeyboardBG";
import ClippedButton from "../components/home/ClippedButton";
import ArrowButton from "../components/ArrowButton";

//Styles
import "../globalStyles/component.scss";
import "./Home.scss";
import { AuthReducerState } from "../types/redux/AuthT";

//Redux
const rdxState = (state: ReduxState) => {
  return {
    userInfo: state.UserInfo,
    isAuth: state.isAuth,
    AnimationState: state.Animations.HomePage,
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
    AnimationIn: () => {
      dispatch(ToggleAnimationIn("HomePage"));
    },
    AnimationOut: () => {
      dispatch(ToggleAnimationOut("HomePage"));
    },
  };
};

//
interface HomeProps {
  localLogout: () => void;
  userInfo: UserInfo;
  setUserInfo: (user: UserInfo) => void;
  isAuth: AuthReducerState;
  AnimationState: {
    isDisplayed: boolean;
    main: number;
  };
  AnimationIn: () => void;
  AnimationOut: () => void;
}

const Home: React.FC<HomeProps> = ({
  localLogout,
  userInfo,
  setUserInfo,
  isAuth,
  AnimationState,
  AnimationIn,
  AnimationOut,
}) => {
  const [logout] = Logout();
  const { data, loading, error, refetch } = GetUserInfo();

  const navigation = useHistory();

  useEffect(() => {
    AnimationIn();
    return () => {
      AnimationOut();
    };
  }, [AnimationIn, AnimationOut]);

  useEffect(() => {
    refetch();
  }, [isAuth, refetch]);

  useEffect(() => {
    if (!loading) {
      if (error || data.getSignedUser.user === null) {
        localLogout();
        setUserInfo(guestUser);
      } else {
        setUserInfo(data.getSignedUser.user);
      }
    }
  }, [data, loading, error, localLogout, setUserInfo]);

  const Redirect = (to: string) => {
    AnimationOut();
    setTimeout(() => navigation.push(to), 300);
  };

  return (
    <div className="homeContainer">
      <div
        style={{
          transform: `translateY(-${AnimationState.main}px)`,
        }}
      >
        <Header
          onUserClick={() => {
            navigation.push("/home/profile/");
          }}
          onTitleClick={() => navigation.push("/home/")}
          username={userInfo.username === "" ? "GUEST" : userInfo.username}
        />
      </div>
      <div
        className="flexContainer"
        style={{ transform: `translateX(-${AnimationState.main * 3}px)` }}
      >
        <ClippedButton onClick={() => null}>Typing test</ClippedButton>
        <ClippedButton onClick={() => Redirect("/practice/")}>
          Practice
        </ClippedButton>
        <ClippedButton onClick={() => null}>Settings</ClippedButton>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100vw",
          transform: `translateX(${AnimationState.main}px)`,
        }}
      >
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
      </div>
      <div
        style={{
          zIndex: -1,
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: `translateY(${AnimationState.main * 3}px)`,
        }}
      >
        <KeyboardBG className="keyboard-bg" />
      </div>
    </div>
  );
};

export default connect(rdxState, rdxDispatch)(Home);
