import styled from "styled-components";

interface props {
  offset?: string;
  theme: any;
}

const Modal = styled.div`
  ${({ offset = "0", theme }: props) => {
    return `
        position: fixed;
        top: 10px;
        bottom: 10px;
        max-width: 600px;
        left: 5%;
        right: 5%;
        margin: auto;
        transition: 0.5s all linear;
        transform: translateX(${offset});
        background: ${theme.colors.b2};
        border: 5px solid ${theme.colors.b4};
        padding: 0 100px;
      `;
  }}
`;

export default Modal;
