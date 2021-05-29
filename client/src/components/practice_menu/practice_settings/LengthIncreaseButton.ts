import styled from "styled-components";
import { Plus } from "@styled-icons/boxicons-regular";

const LengthIncreaseButton = styled(Plus)`
  ${({ theme }) => `
    border-radius: 0px;
    border: 3px solid ${theme.colors.b4};
    background: ${theme.colors.w3};
    color: ${theme.colors.b5};
    cursor: pointer;
    height: 33px;
    width: 33px;
    &: hover{
      border: 3px solid ${theme.colors.w5};
      background: ${theme.colors.b3};
      color: ${theme.colors.w5};
    }
    @media screen and (max-height: 800px){
      height: 27px;
      width: 27px;
    }
  `}
`;

export default LengthIncreaseButton;
