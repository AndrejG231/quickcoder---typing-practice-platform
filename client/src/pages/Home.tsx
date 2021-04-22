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
import {
  ToggleAnimationIn,
  ToggleAnimationOut,
} from "../redux/actions/animationActions";
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
} from "../components/home/";
import ArrowButton from "../components/ArrowButton";

//Redux
const rdxState = (state: ReduxState) => {
  return {
    userInfo: state.UserInfo,
    AuthCount: state.AuthCount.AuthCount,
    AnimationState: state.Animations.HomePage,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    refreshAuth: () => dispatch(refreshAuthAction()),
    setUserInfo: (user: UserInfo) => {
      dispatch(setUserInfoAction(user));
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
  refreshAuth: () => void;
  userInfo: UserInfo;
  AuthCount: number;
  setUserInfo: (user: UserInfo) => void;
  AnimationState: {
    isDisplayed: boolean;
    main: number;
  };
  AnimationIn: () => void;
  AnimationOut: () => void;
}

const Home: React.FC<HomeProps> = ({
  refreshAuth,
  userInfo,
  setUserInfo,
  AuthCount,
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

  const Redirect = (to: string) => {
    AnimationOut();
    setTimeout(() => navigation.push(to), 150);
  };

  return (
    <HomeContainer>
      <Header
        onUserClick={() => {
          navigation.push("/home/profile/");
        }}
        onTitleClick={() => navigation.push("/home/")}
        username={userInfo.username === "" ? "GUEST" : userInfo.username}
      />
      <NavWrapper>
        <ClippedButton onClick={() => null}>Typing test</ClippedButton>
        <ClippedButton onClick={() => Redirect("/practice_menu/")}>
          Practice
        </ClippedButton>
        <ClippedButton onClick={() => null}>Settings</ClippedButton>
        <ClippedButton onClick={() => null}></ClippedButton>
        <ClippedButton onClick={() => null}></ClippedButton>
      </NavWrapper>
      <UserButtonWrapper>
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
              refreshAuth();
            }}
            variant="left"
          >
            Logout
          </ArrowButton>
        )}
      </UserButtonWrapper>
    </HomeContainer>
  );
};

export default connect(rdxState, rdxDispatch)(Home);
