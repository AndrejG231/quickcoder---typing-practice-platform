import styled from "styled-components";

const NavBar = styled.div`
  ${({ theme }) => `
  display: flex;
  justify-content: space-between;
  grid-area: nav;
  background: ${theme.colors.b3};
  margin-bottom: 10px;
  `}
`;

export default NavBar;
