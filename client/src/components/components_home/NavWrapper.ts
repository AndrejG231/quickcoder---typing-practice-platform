import styled from "styled-components";

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  @media screen and (max-width: 700px) {
    order: 2;
    width: 100%;
  }
`;

export default NavWrapper;
