import React from "react";
import {
  ArrowsWrapper,
  TitleArrow,
  TitleArrowBody,
  TitleArrowEnd,
  TitleUnderline,
  SpacerArrow,
  SpacerArrowTip,
  SpacerArrowBody,
  SpacerArrowEnd,
  UserArrow,
  UserArrowTip,
  UserArrowBody,
} from "./Header/";
import { TitleText } from "../../components";

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
    <ArrowsWrapper>
      <TitleArrow>
        <TitleArrowBody onClick={onTitleClick}>
          <TitleText big>QuickCoder</TitleText>
          <TitleUnderline margin />
          <TitleUnderline />
        </TitleArrowBody>
        <TitleArrowEnd />
      </TitleArrow>
      <SpacerArrow onClick={onUserClick}>
        <SpacerArrowTip />
        <SpacerArrowBody />
        <SpacerArrowEnd />
      </SpacerArrow>
      <UserArrow minWidth={username.length * 16.5 + 80}>
        <UserArrowTip />
        <UserArrowBody>
          <TitleText medium>{username}</TitleText>
        </UserArrowBody>
      </UserArrow>
    </ArrowsWrapper>
  );
};

export default Header;
