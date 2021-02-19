import React from "react";
import { UsTemplate } from "../data/KeyBoardTemplate";
import KeyBoard from "../components/practice/KeyBoard";
import TextLine from "../components/practice/TextLine";
import "./Practice.scss";

const Practice = () => {
  return (
    <div className="practiceContainer">
      <TextLine/>
      <KeyBoard
        width={window.innerWidth > 1280 ? 800 : 600}
        layout={UsTemplate}
        className="p-keyboard"
      />
    </div>
  );
};

export default Practice;
