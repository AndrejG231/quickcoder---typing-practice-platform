import { FC } from "react";
import { IconContext, icons } from "react-icons";
import { FaCircleNotch } from "react-icons/fa";
import "./ScoreVisual.scss";

interface ScoreVisualProps {
  practiceLength: number;
  score: number;
}

const ScoreVisual: FC<ScoreVisualProps> = ({ practiceLength, score }) => {
  const iconColor =
    practiceLength < 1000 ? "#ffa600" : score > 800 ? "#15ff00" : "#ff0000";
  return (
    <div className="sV-container">
      <IconContext.Provider
        value={{ className: "sV-icon", style: { color: iconColor } }}
      >
        <FaCircleNotch />
      </IconContext.Provider>
      <div className="sV-values">
        <div className="sV-score">{score}</div>
        <div className="sV-length">{practiceLength}</div>
      </div>
    </div>
  );
};

export default ScoreVisual;