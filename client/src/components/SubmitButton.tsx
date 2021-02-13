import React from "react";
import { IconContext } from "react-icons";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

import "./SubmitButton.scss";

interface SubmitButtonProps {
  error: string;
  className?: string;
  label: string;
  onEvent: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  error,
  className,
  label,
  onEvent,
}) => {
  return (
    <div className={`if-submit-container ${className}`}>
      <button type="submit" className="if-submit" onClick={onEvent}>
        <p className="if-submit-text">{label}</p>
      </button>
      {error ? (
        <div className="if-err-field">
          <IconContext.Provider value={{ className: "if-err-icon" }}>
            <BsFillExclamationTriangleFill />
          </IconContext.Provider>
          <p className="if-err-text">{error}</p>
        </div>
      ) : (
        <div className="if-err-field" />
      )}
    </div>
  );
};

export default SubmitButton;
