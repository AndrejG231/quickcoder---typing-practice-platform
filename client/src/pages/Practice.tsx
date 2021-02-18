import React from "react";
import { UsTemplate } from "../data/KeyBoardTemplate";
import KeyBoard from "../components/practice/KeyBoard";
import "./Practice.scss";

const Practice = () => {
  return (
    <div className="practiceContainer">
      <KeyBoard
        width={window.innerWidth > 1280 ? 800 : 600}
        layout={UsTemplate}
        className="p-keyboard"
      />
    </div>
  );
};

export default Practice;
