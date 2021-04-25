import { FC } from "react";

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
      <div className="sV-values">
        <div className="sV-score">{score}</div>
        <div className="sV-length">{practiceLength}</div>
      </div>
    </div>
  );
};

export default ScoreVisual;
