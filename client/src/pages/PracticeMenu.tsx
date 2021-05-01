import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadMenu } from "../redux/actions";
import { reduxStore } from "../types";
import { getMenu } from "../api";
import { practiceMenu } from "../types/";

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
        onSuccess: setMenu,
        onError: () => null
      });
    }
  }, [menu]);
  return <div>{JSON.stringify(menu)}</div>;
};

export default connect(rdxProps, rdxDispatch)(PracticeMenu);
