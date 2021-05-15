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
    transition: 0.1s all linear;
    white-space: pre;
    transform: translateX(-${19.243 * offset}px);
    position: absolute;
  `};
`;

export default Text;
