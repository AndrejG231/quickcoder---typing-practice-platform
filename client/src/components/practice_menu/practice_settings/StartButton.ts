import styled from "styled-components";

const StartButton = styled.button`
  ${({ theme }) => `
    background: ${theme.colors.b4};
    color: ${theme.colors.w5};
    height: 50px;
    width: 90%;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;
    &:hover{
        background: ${theme.colors.w3};
        color: ${theme.colors.b5};
    }
    @media screen and (max-width: 800px){
      height: 30px;
      margin-top: 0;
    }
  `}
`;

export default StartButton;
