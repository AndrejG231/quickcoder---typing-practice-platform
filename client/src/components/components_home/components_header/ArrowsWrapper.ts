import styled from "styled-components";

interface props {
  isOnScreen: boolean;
}

const ArrowsWrapper = styled.div`
  ${({ isOnScreen }: props) => {
    return `
      position: relative;
      height: 160px;
      width: 100%;
      transition: 0.3s all linear;
      transform: translateY(${isOnScreen ? "0" : "-100vh"});
  `;
  }}
`;

export default ArrowsWrapper;
