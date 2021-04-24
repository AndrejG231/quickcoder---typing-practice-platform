import styled from "styled-components";

interface props {
  width?: number;
  height?: number;
  left?: boolean;
  right?: boolean;
  theme: any;
}

const ArrowButton = styled.div`
  ${({ width, height, left, right, theme }: props) => {
    const w = width ?? 120;
    const h = height ?? 60;

    const leftClip = `
      0px ${h / 2}px,
      ${h / 2}px 0px,
      ${w}px 0px,
      ${w}px ${h}px,
      ${h / 2}px ${h}px
    `;

    const rightClip = `
      0px 0px,
      0px ${h}px,
      ${w - h / 2}px ${h}px,
      ${w}px ${h / 2}px,
      ${w - h / 2}px 0px
    `;

    return `
    width: ${w}px;
    height: ${h}px;
    cursor: pointer;
    background: ${theme.colors.b4};
    clip-path: polygon(${left ? leftClip : right ? rightClip : ""});
    ${theme.centerContent};
    color: ${theme.colors.w5};
    &:hover{
      color: ${theme.colors.b4};
      background: ${theme.colors.w3};
    }
    @media screen and (max-width: 700px){
      clip-path: none;
    }
  `;
  }}
`;

export default ArrowButton;
