import styled from "styled-components";

const FormSubmitButton = styled.button`
  ${({ theme }) => `
    background: ${theme.colors.b4};
    color: ${theme.colors.w5};
    border: 0px solid;
    box-shadow: "none";
    width: 60%;
    height: 50px;
    border-radius: 20px;
    font-size: 26px;
    text-transform: uppercase;
    font-style: italic;
    cursor: pointer;
    &:hover{
      background: ${theme.colors.w4};
      color: ${theme.colors.b5};
    }
    @media screen and (max-width: 700px){
      width: 100%;
    }
  `}
`;

export default FormSubmitButton;
