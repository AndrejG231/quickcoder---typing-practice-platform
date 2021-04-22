import { FC } from "react";

interface StatProps {
  field: string;
  value: string | number;
  className?: string;
}

const Stat: FC<StatProps> = ({ field, value, className = "" }) => {
  return (
    <div className={className}>
      <div className="stat-field">{field}:</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

export default Stat;
