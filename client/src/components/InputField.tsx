import React from "react";

import { ActionResponse } from "../types/graphql/ActResMutationsT";

interface InputFieldProps {
  error: ActionResponse;
  label: string;
  value?: string;
  onEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  error,
  label,
  value,
  onEvent,
  className,
  type,
  name = "",
}) => {
  return (
    <div className={`if-container ${className}`}>
      <div className="if-label-field">
        <p className="if-label">{label}:</p>
      </div>

      <input
        type={type}
        className="if-field"
        value={value}
        onChange={onEvent}
      />

      {error.info.split("_")[1] === name ? (
        <div className="if-err-field">
          <p className="if-err-text">{error.message}</p>
        </div>
      ) : (
        <div className="if-err-field" />
      )}
    </div>
  );
};

export default InputField;
