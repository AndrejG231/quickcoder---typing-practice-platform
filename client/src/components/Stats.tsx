import React, { FC, useEffect, useState } from "react";
import { practiceObject } from "../types";
import { Name, StatContainer, Value } from "./stats/";
import { calculatePracticeScore, msToTime } from "../utilites";

interface props {
  practice: practiceObject;
  noTimer?: boolean;
  noLastError?: boolean;
  column?: boolean;
}

const Stats: FC<props> = ({ practice, noTimer, column, noLastError }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!noTimer) {
      const timer = setInterval(() => setTime(new Date().getTime()), 100);
      return () => clearInterval(timer);
    }
  }, [noTimer, setTime]);
  const totalTimeSpend =
    practice.start_time && !noTimer
      ? new Date().getTime() - practice.start_time + practice.time_spent
      : practice.time_spent;

  const { cpm, errors_rate, score } = calculatePracticeScore(
    practice.index,
    Object.keys(practice.errors).length,
    totalTimeSpend
  );

  return (
    <StatContainer column={!!column}>
      <Name index={0}>Score:</Name>
      <Value index={0}>{score || 0}</Value>
      <Name index={1}>Time:</Name>
      <Value index={1}>{msToTime(totalTimeSpend)}</Value>
      <Name index={2}>Characters:</Name>
      <Value index={2}>{practice.index}</Value>
      <Name index={3}>Errors:</Name>
      <Value index={3}>{Object.keys(practice.errors).length}</Value>
      <Name index={4}>Error rate:</Name>
      <Value index={4}>{errors_rate ? errors_rate.toFixed(2) : 0}%</Value>
      <Name index={5}>CPM:</Name>
      <Value index={5}>{cpm || 0}</Value>
      {!noLastError ? <Name index={6}>Last Error:</Name> : null}
      {!noLastError ? <Value index={6}>{practice.last_error}</Value> : null}
    </StatContainer>
  );
};

export default Stats;
