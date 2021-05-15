import styled from "styled-components";
import { theme } from "../../../static";

interface props {
  theme: any;
  offset: number;
}

const Text = styled.div`
  ${({ theme, offset }: props) => `
    color: ${theme.colors.w3};
    line-height: 80px;
    font-size: 35px;
    font-family: monospace;
    transform: translateX(-${17.5 * offset}px);
  `};
`;

export default Text;
