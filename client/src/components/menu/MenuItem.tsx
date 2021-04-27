import React from "react";
import { connect } from "react-redux";
import { ReduxState } from "../../types/reduxStore";
import { toggleCategoryAction } from "../../redux/actions/practiceMenuActions";
import { resetPracticeSession } from "../../redux/actions/practiceActions";
import ScoreVisual from "./ScoreVisual";
import { PracticeObjectT } from "../../types/practice/PracticeT";
import { userStatObjectT } from "../../types/types_redux/userPracticeStatsT";

const rdxProps = (state: ReduxState) => {
  return {
    isOpen: state.PracticeMenu.categoriesDisplay,
    practiceStats: state.PracticeUserStats,
    selectedPractice: state.PracticeSelection.selected,
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
  practiceStats: userStatObjectT;
  selectedPractice: string;
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
  selectedPractice,
  onClick,
  practiceStats,
}) => {
  const stats = practiceStats[`${category}+${title}`];
  const selectedClass =
    selectedPractice === `${category}+${title}` ? "selected" : "";

  if (!isOpen[category] && type === "practice") {
    return null;
  }

  return (
    <div
      onClick={() => {
        if (type === "practice") {
          resetPractice();
        } else {
          toggle(title);
        }
        onClick();
      }}
      className={`${type} ${className} ${selectedClass} mI-container`}
    >
      <div className="mI-text">
        <div className={`${type} mI-title`}>{title.replaceAll("_", " ")}</div>
        <div className={`${type} menuItem-desc`}>{desc}</div>
      </div>
      <div className="mI-visual">
        {type === "practice" ? (
          <ScoreVisual
            className={selectedClass}
            practiceLength={stats?.length ? stats.length : 0}
            score={stats?.score ? stats.score : 0}
          />
        ) : null}
      </div>
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(MenuItem);
