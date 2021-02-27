import { FC, useEffect, useState } from "react";
import { start } from "repl";
import msToTime from "../../utilites/msToTime";

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
    <div className="liveStats-container">
      <div className="liveStats-field">
        Time: {startTime >= 0 ? msToTime(time - startTime) : msToTime(0)}
      </div>
      <div className="liveStats-field">Characters: {characters}</div>
      <div className="liveStats-field">Errors: {errors}</div>
      <div className="liveStats-field">
        Error rate: {Math.round((errors / characters) * 10000) / 100 || 0} %
      </div>
      <div className="liveStats-field">
        CPM: {Math.round(characters / ((time - startTime) / 60000))}
      </div>
    </div>
  );
};

export default LiveStats;
