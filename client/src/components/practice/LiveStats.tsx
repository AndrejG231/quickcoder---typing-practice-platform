import { FC, useEffect, useState } from "react";
import msToTime from "../../utilites/msToTime";
import "./LiveStats.scss";

interface LiveStatsProps {
  startTime: number;
  characters: number;
  errors: number;
}

const LiveStats: FC<LiveStatsProps> = ({ startTime, characters, errors }) => {
  const [time, setTime] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().getTime()), 99);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="lS-container">
      <div className="lS-time">
        {startTime >= 0 ? msToTime(time - startTime) : msToTime(0)}
        <div className="lS-time-underLine" />
      </div>
      <div className="lS-stats">
        <div className="lS-field">
          Characters:<span className="lS-value">{characters}</span>
        </div>
        <div className="lS-field">
          Errors:
          <span className="lS-value">{errors}</span>
        </div>
        <div className="lS-field">
          Error rate:
          <span className="lS-value">
            {Math.round((errors / characters) * 10000) / 100 || 0} %
          </span>
        </div>
        <div className="lS-field">
          CPM:
          <span className="lS-value">
            {Math.round(characters / ((time - startTime) / 60000))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;
