import React from "react";
import "./ArrowButton.scss";

interface ArrowButtonProps {
  children: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  variant: "left" | "right";
  bodyWidth: string;
  className?: string;
  textClass?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  children,
  onClick,
  variant,
  bodyWidth,
  className,
  textClass,
}) => {
  return (
    <div
      onClick={onClick}
      className={`button-body ${variant} ${className}`}
      style={{ width: bodyWidth }}
    >
      <div className={"tip " + variant}></div>
      <p className={`button-text ${variant} ${textClass}`}>{children}</p>
    </div>
  );
};

export default ArrowButton;
