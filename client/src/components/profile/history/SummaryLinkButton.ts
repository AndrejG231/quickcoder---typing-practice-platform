import styled from "styled-components";
import { Search } from "@styled-icons/boxicons-regular";

const SummaryLinkButton = styled(Search)`
  ${({ theme }) => `
    background: ${theme.colors.b3};
    width: calc(100% - 20px);
    padding: 10px;
    color: ${theme.colors.w4};
    margin: auto;
    cursor: pointer;
    height: 60px;
  `}
`;

export default SummaryLinkButton;
