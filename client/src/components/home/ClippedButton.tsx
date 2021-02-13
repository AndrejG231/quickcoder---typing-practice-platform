import React from "react";

import "./ClippedButton.scss";

interface ClippedButtonProps {
  children: string;
  className?: string;
}

const ClippedButton: React.FC<ClippedButtonProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`cb-container ${className}`}>
      <p className="cb-text">{children}</p>
    </div>
  );
};

export default ClippedButton;
