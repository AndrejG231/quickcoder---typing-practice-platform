import styled from "styled-components";

const ModalCloseButton = styled.button`
  ${({ theme }) => {
    return `
        width: 120px;
        height: 50px;
        background: ${theme.colors.b4};
        color: ${theme.colors.w5};
        position: absolute;
        top: 5px;
        right: 5px;
        border-radius: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover{
            background: ${theme.colors.b4};
            color: ${theme.colors.w5};
        }
      `;
  }}
`;

export default ModalCloseButton;
