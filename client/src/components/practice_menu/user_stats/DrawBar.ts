import styled from "styled-components";

interface props {
  width: number;
  theme: any;
}

const DrawBar = styled.div.attrs<props>(({ width, theme }) => {
  let color;
  if (width < 5) {
    color = theme.colors.b5;
  } else if (width < 10) {
    color = "#801c1c";
  } else if (width < 25) {
    color = "#915411";
  } else if (width < 50) {
    color = "#8c7918";
  } else if (width < 75) {
    color = "#549400";
  } else if (width < 100) {
    color = "#45700c";
  } else {
    color = "green";
  }

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
