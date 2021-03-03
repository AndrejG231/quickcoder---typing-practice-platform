import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsFillCaretRightFill, BsFillCaretUpFill } from "react-icons/bs";
import { ReduxState } from "../../types/redux/ReduxState";
import { toggleCategoryAction } from "../../redux/actions/practiceMenuActions";
import { resetPracticeSession } from "../../redux/actions/practiceActions";
import ScoreVisual from "./ScoreVisual";
import "./MenuItem.scss";

const rdxProps = (state: ReduxState) => {
  return {
    isOpen: state.PracticeMenu.categoriesDisplay,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    toggle: (category: string) => {
      dispatch(toggleCategoryAction(category));
    },
    resetPractice: () => {
      dispatch(resetPracticeSession());
    },
  };
};

interface MenuItemProps {
  isOpen: { [key in string]: boolean };
  toggle: (category: string) => void;
  resetPractice: () => void;
  className?: string;
  type: string;
  title: string;
  desc: string;
  overwiev?: string;
  category: string;
  onClick: () => void;
  userScore?: number;
  userPlayLength?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  toggle,
  resetPractice,
  isOpen,
  className,
  type,
  title,
  desc,
  category,
  overwiev,
  onClick,
  userScore,
  userPlayLength,
}) => {
  console.log(title, userScore);
  const nav = useHistory();
  if (!isOpen[category] && type === "practice") {
    return null;
  }
  return (
    <div
      onClick={() => {
        if (type === "practice") {
          resetPractice();
          nav.push(
            `/practice/p=${category.replaceAll(" ", "_")}+${title.replaceAll(
              " ",
              "_"
            )}/l=50/`
          );
        } else {
          toggle(category);
        }
        onClick();
      }}
      className={`${type} ${className} mI-container`}
    >
      <div className="mI-text">
        <div className={`${type} mI-title`}>{title}</div>
        <div className={`${type} menuItem-desc`}>{desc}</div>
        {/* 
        {type === "practice" ? (
          <div className={`${type} menuItem-overview`}>"{overwiev}"</div>
        ) : null}
      </div> */}
      </div>
      <div className="mI-visual">
        {type === "practice" ? (
          <ScoreVisual
            practiceLength={userPlayLength ? userPlayLength : 0}
            score={userScore ? userScore : 0}
          />
        ) : (
          <IconContext.Provider value={{ className: "mI-category-open" }}>
            {isOpen[category] ? (
              <BsFillCaretUpFill />
            ) : (
              <BsFillCaretRightFill />
            )}
          </IconContext.Provider>
        )}
      </div>
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(MenuItem);
