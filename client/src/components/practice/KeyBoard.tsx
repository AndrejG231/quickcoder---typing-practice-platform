import React from "react";
import { connect } from "react-redux";
import { Layout, Keys, Characters } from "../../types/practice/KeyBoardT";
import { UsColors, ColorScheme } from "../../data/KeysColors";
import { US } from "../../data/KeysMap";
import "./KeyBoard.scss";
import { ReduxState } from "../../types/redux/ReduxState";
import { BottomLine } from "../../data/KeyBoardTemplate";

interface KeyProps {
  size: number;
  character: Keys;
  isNext?: boolean;
  isLastWrong?: boolean;
}

const Key: React.FC<KeyProps> = ({ size, character, isNext, isLastWrong }) => {
  let background: string = "";

  if (isNext) {
    background = ColorScheme[UsColors[character]];
  }

  if (isLastWrong) {
    background = ColorScheme["ERROR"];
  }

  let width: number;
  switch (character) {
    case "Enter":
      width = size * 1.5;
      break;
    case "TAB":
      width = size * 1.5;
      break;
    case "CAPS":
      width = size * 1.8;
      break;
    case "LShift":
      width = size * 2.2;
      break;
    case "RShift":
      width = size * 2.8;
      break;
    case "BSpace":
      width = size * 2;
      break;
    case "--":
      width = size * 1.2;
      break;
    case " ":
      width = size * 6;
      break;
    case "ctrl":
      width = size * 1.5;
      break;
    case "alt":
      width = size * 1.5;
      break;
    case "XX":
      width = size * 1.5;
      break;
    default:
      width = size;
  }
  return (
    <div
      className="p_key"
      style={{ width: width, height: size, background: background }}
    >
      <p>{character.toUpperCase()}</p>
    </div>
  );
};

const rdxProps = (state: ReduxState) => {
  return {
    nextKey: state.Practice.string[state.Practice.index] as Characters,
    lastError: state.Practice.lastError as Characters,
  };
};

interface KeyBoardProps {
  nextKey: Characters;
  lastError: Characters;
  className: string;
  width: number;
  layout: Layout;
}

const KeyBoard: React.FC<KeyBoardProps> = ({
  nextKey,
  lastError,
  width,
  layout,
  className,
}) => {
  return (
    <div
      className={`keyboard-container ${className}`}
      style={{ width: width, height: width * 0.37 }}
    >
      <div className="keyboard-row">
        {layout.Number.map((key, i) => {
          return (
            <Key
              isLastWrong={US[lastError]?.indexOf(key) >= 0 ? true : false}
              isNext={US[nextKey]?.indexOf(key) >= 0 ? true : false}
              character={key}
              key={i}
              size={width * 0.06}
            />
          );
        })}
      </div>
      <div className="keyboard-row">
        {layout.Upper.map((key, i) => {
          return (
            <Key
              isLastWrong={US[lastError]?.indexOf(key) >= 0 ? true : false}
              isNext={US[nextKey]?.indexOf(key) >= 0 ? true : false}
              character={key}
              key={i}
              size={width * 0.06}
            />
          );
        })}
      </div>
      <div className="keyboard-row">
        {layout.Middle.map((key, i) => {
          return (
            <Key
              isLastWrong={US[lastError]?.indexOf(key) >= 0 ? true : false}
              isNext={US[nextKey]?.indexOf(key) >= 0 ? true : false}
              character={key}
              key={i}
              size={width * 0.06}
            />
          );
        })}
      </div>
      <div className="keyboard-row">
        {layout.Lower.map((key, i) => {
          return (
            <Key
              isLastWrong={US[lastError]?.indexOf(key) >= 0 ? true : false}
              isNext={US[nextKey]?.indexOf(key) >= 0 ? true : false}
              character={key}
              key={i}
              size={width * 0.06}
            />
          );
        })}
      </div>
      <div className="keyboard-row">
        {BottomLine.map((key, i) => {
          return (
            <Key
              isLastWrong={US[lastError]?.indexOf(key) >= 0 ? true : false}
              isNext={US[nextKey]?.indexOf(key) >= 0 ? true : false}
              character={key}
              key={i}
              size={width * 0.06}
            />
          );
        })}
      </div>
    </div>
  );
};

export default connect(rdxProps, () => {
  return {};
})(KeyBoard);
