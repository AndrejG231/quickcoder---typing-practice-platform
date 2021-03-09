import { FC } from "react";
import { IconContext, icons } from "react-icons";
import { FaCircleNotch } from "react-icons/fa";
import "./ScoreVisual.scss";

interface ScoreVisualProps {
  practiceLength: number;
  score: number;
  className: string;
}

const ScoreVisual: FC<ScoreVisualProps> = ({
  practiceLength,
  score,
  className,
}) => {
  const iconColor =
    practiceLength < 500 ? "#ffa600" : score > 800 ? "#15ff00" : "#ff0000";
  return (
    <div className={`sV-container ${className}`}>
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
