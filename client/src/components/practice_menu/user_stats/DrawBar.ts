import styled from "styled-components";
import { statColorSwitch } from "../../../utilites";

interface props {
  width: number;
}

const DrawBar = styled.div.attrs<props>(({ width }) => {
  const color = statColorSwitch(width);

  return {
    style: {
      background: color,
      width: `${width}%`,
      // transform: `scaleX(${width * 100}%)`,
    },
  };
})<props>`
  height: 100%;
  transform-origin: top left;
  transition: 0.3s all linear;
`;

export default DrawBar;
