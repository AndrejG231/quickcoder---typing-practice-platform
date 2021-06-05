import React, { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { practiceMenu, reduxStore, userInfo } from "./types";

import { getMenu, getUserInfo } from "./api";

import {
  loadMenu,
  setGlobalMessage,
  setUserInfo,
  toggleAuthRefresh,
} from "./redux/actions";

const rdxProps = (state: reduxStore) => ({
  menu: state.practiceMenu,
  awaitingAuth: state.authentication.awaitingAuth,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  setMenu: (menu: practiceMenu) => dispatch(loadMenu(menu)),
  setPopUp: (message: string) => dispatch(setGlobalMessage(message)),
  setUserInfo: (user: userInfo | null) => dispatch(setUserInfo(user)),
  setAuthRefreshed: () => dispatch(toggleAuthRefresh(false)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const GlobalFetching: FC<props> = ({
  awaitingAuth,
  menu,
  setAuthRefreshed,
  setMenu,
  setPopUp,
  setUserInfo,
}) => {
  // Global data fetching - menu
  useEffect(() => {
    if (!menu) {
      getMenu({
        onSuccess: (menu) => {
          setMenu(menu);
        },
        onError: () =>
          setPopUp(
            "Error: could not load neccessary data. Try refreshing page to fix this problem."
          ),
      });
    }
  }, [menu]);

  //Fetch user when awaiting auth
  useEffect(() => {
    if (awaitingAuth) {
      // TODO: reset user practice stats
      getUserInfo({
        onSuccess: (userInfo) => {
          setUserInfo(userInfo);
          setAuthRefreshed();
        },
        onError: () => {
          setUserInfo(null);
          setAuthRefreshed();
        },
      });
    }
  }, [awaitingAuth, setUserInfo]);

  return null;
};

export default withRedux(GlobalFetching);
