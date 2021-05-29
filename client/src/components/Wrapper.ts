import styled from "styled-components";

interface props {
  between?: boolean;
  center?: boolean;
  height?: string | number;
}

const Wrapper = styled.div<props>`
  ${({ between, center, height }) => `
  display: flex;
  
  flex-direction: column;
  width: 100%;
  ${
    between
      ? `justify-content: space-between;`
      : center
      ? `justify-content: center`
      : `justify-content: space-evenly`
  }
  ${
    typeof height === "number"
      ? `height: ${height}px;`
      : typeof height === "string"
      ? `height: ${height};`
      : ""
  }
`}
`;

export default Wrapper;
