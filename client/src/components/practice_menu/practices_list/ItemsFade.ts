import styled from "styled-components";

interface props {
  top?: boolean;
  bottom?: boolean;
}

const ItemsFade = styled.div<props>`
  ${({ theme, top, bottom }) => `
    position: absolute;
    height: 70px;
    width: 100%;
    ${
      top
        ? `
          top: 0px;
          background: linear-gradient( 180deg, ${theme.colors.b3} 20%, rgba(0,0,0,0) 100%);
        `
        : ""
    }
    ${
      bottom
        ? `
          bottom: 0px;
          background: linear-gradient( 0deg, ${theme.colors.b3} 20%, rgba(0,0,0,0) 100%);
        `
        : ""
    }
  `}
`;

export default ItemsFade;
