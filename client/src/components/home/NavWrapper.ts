import styled from "styled-components";

interface props {
  isOnScreen: boolean;
}

const NavWrapper = styled.div`
  ${({ isOnScreen }: props) => {
    return `
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      flex-grow: 1;
      transition: 0.3s all linear;
      transform: translateX(${isOnScreen? 0 : "-100vw"});
      @media screen and (max-width: 700px) {
        order: 2;
        width: 100%;
      }
  `;
  }}
`;

export default NavWrapper;
