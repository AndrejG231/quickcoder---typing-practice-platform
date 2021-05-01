import { XCircle } from "@styled-icons/boxicons-regular";
import styled from "styled-components";

const CloseIcon = styled(XCircle)`
  ${({ theme }) => `
    cursor: pointer;
    color: ${theme.colors.w3};
    margin-right: 30px;
    font-size: 80px;
    &:hover {
      color: ${theme.colors.w5};
      transform: scale(1.2);
    }
    @media screen and (max-width: 700px){
      transform: scale(2.2);
      &:hover {
        transform: scale(3);
      }
    }
  `}
`;

export default CloseIcon;
