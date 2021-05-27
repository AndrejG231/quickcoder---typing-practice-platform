import styled from "styled-components";
import { theme } from "../../../static";

interface props {
  theme: any;
  offset: number;
}

const Text = styled.div.attrs<props>(({ offset }) => ({
  style: {
    transform: `translateX(-${19.243 * offset}px)`,
  },
}))`
  ${({ theme }: props) => `
    color: ${theme.colors.w3};
    line-height: 80px;
    font-size: 35px;
    font-family: monospace;
    transition: 0.1s all linear;
    white-space: pre;
    position: absolute;
  `};
`;

export default Text;
