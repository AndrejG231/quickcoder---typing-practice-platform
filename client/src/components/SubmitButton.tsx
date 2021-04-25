import React from "react";

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
          <p className="if-err-text">{error}</p>
        </div>
      ) : (
        <div className="if-err-field" />
      )}
    </div>
  );
};

export default SubmitButton;
