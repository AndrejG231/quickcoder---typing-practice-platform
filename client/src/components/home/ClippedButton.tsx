import React from "react";

import "./ClippedButton.scss";

interface ClippedButtonProps {
  children: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const ClippedButton: React.FC<ClippedButtonProps> = ({
  children,
  className,
  onClick
}) => {
  return (
    <div onClick={onClick} className={`cb-container ${className}`}>
      <p className="cb-text">{children}</p>
    </div>
  );
};

export default ClippedButton;
