import styled from "styled-components";

interface props {
  isOnScreen?: boolean;
}

const UserNameContainer = styled.div<props>`
  ${({ theme, isOnScreen }) => `
  transition: 0.2s all linear;
  position: relative;
  height: 100%;
  grid-area: user;
  background: ${theme.colors.b4};
  width: 100%;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  color: ${theme.colors.w5};
  font-size: 100px;
  line-height: 160px;
  padding-left: 40px;
  text-align: center;
  ${!isOnScreen ? "transform: translateX(70vw)" : ""};
  `}
`;

export default UserNameContainer;
