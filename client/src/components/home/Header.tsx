import React from "react";

interface HeaderProps {
  className?: string;
  username: string;
  onUserClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onTitleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Header: React.FC<HeaderProps> = ({
  className = "",
  username,
  onUserClick,
  onTitleClick,
}) => {
  return (
    <div className={`component container arrows ${className}`}>
      <div className="title arrow">
        <div onClick={onTitleClick} className="body fullH">
          <h1 className="title-text">QuickCoder</h1>
          <div className="underline f"></div>
          <div className="underline"></div>
        </div>
        <div className="end fullH"></div>
      </div>
      <div className="spacer arrow">
        <div className="tip fullH"></div>
        <div className="body fullH"></div>
        <div className="end fullH"></div>
      </div>
      <div
        style={{
          minWidth: username.length * 16.5 + 80,
        }}
        className="user arrow"
      >
        <div className="tip fullH"></div>
        <div onClick={onUserClick} className="body fullH">
          <h4 className="title-text">{username}</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
