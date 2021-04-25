import React from "react";
import {
  ArrowsWrapper,
  TitleArrow,
  TitleUnderline,
  SpacerArrow,
  SpacerArrowTip,
  SpacerArrowBody,
  SpacerArrowEnd,
  UserArrow,
  UserDisplayName,
  HeaderTitle,
} from "./components_header";

interface HeaderProps {
  username: string;
  onUserClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onTitleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Header: React.FC<HeaderProps> = ({
  username,
  onUserClick,
  onTitleClick,
}) => {
  return (
    <ArrowsWrapper>
      <TitleArrow onClick={onTitleClick}>
        <HeaderTitle>QuickCoder</HeaderTitle>
        <TitleUnderline margin />
        <TitleUnderline />
      </TitleArrow>
      <SpacerArrow>
        <SpacerArrowTip />
        <SpacerArrowBody />
        <SpacerArrowEnd />
      </SpacerArrow>
      <UserArrow onClick={onUserClick}>
        <UserDisplayName>{username}</UserDisplayName>
      </UserArrow>
    </ArrowsWrapper>
  );
};

export default Header;
