import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadMenu } from "../redux/actions";
import { reduxStore } from "../types";
import { getMenu } from "../api";
import { practiceMenu } from "../types/";
import {
  MenuWrapper,
  PracticesList,
  UserStats,
  PracticeSettings,
} from "../components/practice_menu";

const rdxProps = (state: reduxStore) => {
  return { menu: state.practiceMenu };
};

const rdxDispatch = (dispatch: any) => {
  return {
    setMenu: (menu: practiceMenu) => dispatch(loadMenu(menu)),
  };
};

interface PracticeMenuProps {
  menu: practiceMenu;
  setMenu: (menu: practiceMenu) => void;
}

const PracticeMenu: React.FC<PracticeMenuProps> = ({ menu, setMenu }) => {
  useEffect(() => {
    if (!menu) {
      getMenu({
        onSuccess: (menu) => {
          setMenu(menu);
        },
        onError: () => null,
      });
    }
  }, [menu]);

  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
    <MenuWrapper>
      <PracticesList menu={menu} />
      <UserStats />
      <PracticeSettings />
    </MenuWrapper>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeMenu);
