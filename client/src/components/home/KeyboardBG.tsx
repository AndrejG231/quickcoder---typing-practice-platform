import React from "react";
import "../../globalStyles/component.css";
import "./KeyBoardBG.css";
interface KeyboardBGprops {
  className?: string;
}

const KBGKey: React.FC<{ char?: string }> = ({ char }) => {
  return (
    <div className="key">
      <p className="keychar">{char}</p>
    </div>
  );
};

const KeyboardBG: React.FC<KeyboardBGprops> = ({ className }) => {
  return (
    <div className={`kbgcontainer component ${className}`}>
      <div className={"kgbrow"}>
        {["", "Q", "U", "I", "C", "K", " ", " "].map((i) => {
          return <KBGKey char={i} />;
        })}
      </div>
      <div className={"kgbrow"}>
        {["", "", "", "C", "O", "D", "E", "R"].map((i) => {
          return <KBGKey char={i} />;
        })}
      </div>
      <div className={"kgbrow"}>
        {Array(8)
          .fill("")
          .map(() => {
            return <KBGKey />;
          })}
      </div>
      <div className={"kgbrow"}>
        {Array(8)
          .fill("")
          .map(() => {
            return <KBGKey />;
          })}
      </div>
      <div className="fadeCover" />
    </div>
  );
};

export default KeyboardBG;
