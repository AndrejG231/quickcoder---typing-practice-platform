import React, { FC, useEffect, useState } from "react";
import { practiceObject } from "../types";
import { Name, StatContainer, Value } from "./stats/";
import { msToTime } from "../utilites";

interface props {
  practice: practiceObject;
  noTimer?: boolean;
  column?: boolean;
}

const Stats: FC<props> = ({ practice, noTimer, column }) => {
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

  const errorRate =
    (Object.keys(practice.errors).length / practice.index) * 100;

  const cpm = Math.round(practice.index / (totalTimeSpend / 60000));

  return (
    <StatContainer column={!!column}>
      <Name index={1}>Time:</Name>
      <Value index={1}>{msToTime(totalTimeSpend)}</Value>
      <Name index={2}>Characters:</Name>
      <Value index={2}>{practice.index}</Value>
      <Name index={3}>Errors:</Name>
      <Value index={3}>{Object.keys(practice.errors).length}</Value>
      <Name index={4}>Error rate:</Name>
      <Value index={4}>{errorRate ? errorRate.toFixed(2) : 0}%</Value>
      <Name index={5}>CPM:</Name>
      <Value index={5}>{cpm || 0}</Value>
      {!column ? <Name index={6}>Last Error:</Name> : null}
      {!column ? <Value index={6}>{practice.last_error}</Value> : null}
    </StatContainer>
  );
};

export default Stats;
