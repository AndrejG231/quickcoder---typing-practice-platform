import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { reduxStore } from "../types";
import {
  MenuWrapper,
  PracticesList,
  UserStats,
  PracticeSettings,
} from "../components/practice_menu";

const rdxProps = (state: reduxStore) => {
  return {
    menu: state.practiceMenu,
  };
};

const rdxDispatch = (dispatch: any) => ({});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const PracticeMenu: React.FC<props> = ({ menu }) => {
  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
    <MenuWrapper>
      <PracticesList />
      <UserStats />
      <PracticeSettings />
    </MenuWrapper>
  );
};

export default withRedux(PracticeMenu);
