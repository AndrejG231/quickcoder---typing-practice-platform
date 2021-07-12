import styled from "styled-components";

interface props {}

const NavParameter = styled.li<props>`
  margin-left: 15px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.w5};
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export default NavParameter;
