import styled from "styled-components";

interface props {
  color: string;
  highlight: boolean;
  theme: any;
}

const FingerTag = styled.div`
  ${({ color, highlight, theme }: props) => `
    width: 60px;
    height: 40px;
    background: ${color};
    outline: ${
      highlight
        ? `4px solid ${theme.colors.w4}`
        : `2px solid ${theme.colors.b4}`
    };
    font-size: 15px;
    line-height: 40px;
    text-align: center;
    text-transform: capitalize;
    color: ${theme.colors.b5};
    font-weight: 600;
  `}
`;

export default FingerTag;
