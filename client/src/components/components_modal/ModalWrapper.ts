import styled from "styled-components";

interface props {
  isOnScreen?: boolean;
  theme: any;
}

const ModalWrapper = styled.div`
  ${({ isOnScreen, theme }: props) => {
    return `
        position: fixed;
        top: 10px;
        bottom: 10px;
        max-width: 600px;
        left: 105%;
        right: -95%;
        margin: auto;
        transition: 0.5s all linear;
        transform: translateX(${isOnScreen ? "-100vw" : 0});
        background: ${theme.colors.b2};
        border: 5px solid ${theme.colors.b4};
        padding: 0 100px;
      `;
  }}
`;

export default ModalWrapper;
