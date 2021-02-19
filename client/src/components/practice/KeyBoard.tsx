import React from "react";
import { Layout, Keys } from "../../types/practice/KeyBoardT";
import { UsColors, ColorScheme } from "../../data/KeysColors";
import "./KeyBoard.scss";

interface KeyProps {
  size: number;
  character: Keys;
  isNext?: boolean;
  isLastWrong?: boolean;
}

const Key: React.FC<KeyProps> = ({ size, character, isNext, isLastWrong }) => {
  let background: string = "";

  if (isNext){
  background = ColorScheme[UsColors[character]];
  }

  if(isLastWrong){
    background = ColorScheme["ERROR"]
  }

  console.log(UsColors[character])
  console.log(ColorScheme[UsColors[character]])
  console.log(background)

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
    case " ":
      width = size * 1.2;
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

interface KeyBoardProps {
  className: string;
  width: number;
  layout: Layout;
}

const KeyBoard: React.FC<KeyBoardProps> = ({ width, layout, className }) => {
  const [next, last] = ["f", "b"];
  return (
    <div
      className={`keyboard-container ${className}`}
      style={{ width: width, height: width * 0.3 }}
    >
      <div className="keyboard-row">
        {layout.Number.map((key, i) => {
          return (
            <Key
              isLastWrong={last === key ? true : false}
              isNext={next === key ? true : false}
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
              isLastWrong={last === key ? true : false}
              isNext={next === key ? true : false}
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
              isLastWrong={last === key ? true : false}
              isNext={next === key ? true : false}
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
              isLastWrong={last === key ? true : false}
              isNext={next === key ? true : false}
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

export default KeyBoard;
