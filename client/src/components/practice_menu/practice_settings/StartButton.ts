import styled from "styled-components";

const StartButton = styled.button`
  ${({ theme }) => `
    background: ${theme.colors.b4};
    color: ${theme.colors.w5};
    height: 50px;
    width: 90%;
    font-size: 18px;
    cursor: pointer;
    &:hover{
        background: ${theme.colors.w3};
        color: ${theme.colors.b5};
    }
  `}
`;

export default StartButton;
