import styled from "styled-components";

interface props {
  isOnScreen?: boolean;
}

const NavBar = styled.div<props>`
  ${({ theme, isOnScreen }) => `
 ${!isOnScreen ? "transform: translateY(-200px)" : ""};
 transition: 0.3s all linear;
  display: flex;
  justify-content: space-between;
  grid-area: nav;
  width: 100%;
  overflow: auto;
  background: ${theme.colors.b3};
  margin-bottom: 10px;
  height: 100%;
  `}
`;

export default NavBar;
