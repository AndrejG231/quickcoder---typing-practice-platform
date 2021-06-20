import { Play } from "@styled-icons/boxicons-regular";
import styled from "styled-components";

const ContinueButton = styled(Play)`
  ${({ theme }) => `
    background: ${theme.colors.b4};
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    color: ${theme.colors.w4};
    margin: auto;
    cursor: pointer;
  `}
`;

export default ContinueButton;
