import styled from "styled-components";

interface props {
  offset: number;
  animation: boolean;
}

const Text = styled.div.attrs<props>(({ offset, theme }) => ({
  style: {
    transform: `translateX(-${theme.width * offset}px)`,
  },
}))<props>`
  ${({ theme, animation }) => `
    color: ${theme.colors.w3};
    line-height: 80px;
    font-size: 35px;
    font-family: 'Source Code Pro', monospace;
    ${animation ? `transition: 0.1s all linear` : ""};
    white-space: pre;
    position: absolute;
  `};
`;

export default Text;
