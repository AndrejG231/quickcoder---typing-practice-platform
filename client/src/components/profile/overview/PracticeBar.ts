import styled from "styled-components";
import { statColorSwitch } from "../../../utilites";

interface props {
  value: number;
  index: number;
  theme: any;
  cpm?: boolean;
  error?: boolean;
}

const PracticeBar = styled.div<props>`
  ${({ value, index, theme, cpm, error }) => {
    return `
    position: relative;
    background: ${statColorSwitch(value)};
    min-height: ${value}%;
    max-height: ${value}%;
    min-width: 50%;
    max-width: 50%;
    border: 3px solid ${theme.colors.b4};
    flex-direction: column;
    ${
      error
        ? `
        grid-area: err${index};
        border-top: 0px;
        align-self: flex-start;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        `
        : cpm
        ? `
        grid-area: cpm${index};
        border-bottom: 0px;
        align-self: flex-end;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        `
        : ""
    }
    margin: 0 auto;
  `;
  }}
`;

export default PracticeBar;
