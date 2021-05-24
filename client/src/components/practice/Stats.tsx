import React, { FC, useEffect, useState } from "react";
import { practiceObject } from "../../types";
import { Name, StatContainer, Value } from "./stats/";
import { msToTime } from "../../utilites";

interface props {
  practice: practiceObject;
}

const Stats: FC<props> = ({ practice }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().getTime()), 100);
    return () => clearInterval(timer);
  }, []);

  const totalTimeSpend = practice.start_time
    ? new Date().getTime() - practice.start_time + practice.time_spent
    : practice.time_spent;

  console.log(practice);

  return (
    <StatContainer>
      <Name index={1}>Time:</Name>
      <Value index={1}>{msToTime(totalTimeSpend)}</Value>
      <Name index={2}>Characters:</Name>
      <Value index={2}>{practice.index}</Value>
      <Name index={3}>Errors:</Name>
      <Value index={3}>{Object.keys(practice.errors).length}</Value>
      <Name index={4}>Error rate:</Name>
      <Value index={4}>
        {((Object.keys(practice.errors).length / practice.index) * 100).toFixed(
          2
        )}
        %
      </Value>
      <Name index={5}>CPM:</Name>
      <Value index={5}>
        {Math.round(practice.index / (totalTimeSpend / 60000))}
      </Value>
      <Name index={6}>Last Error:</Name>
      <Value index={6}>{practice.last_error}</Value>
    </StatContainer>
  );
};

export default Stats;