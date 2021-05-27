import styled from "styled-components";

interface props {
  top?: boolean;
  bottom?: boolean;
  theme: any;
}

const ItemsFade = styled.div`
  ${({ theme, top, bottom }: props) => `
    position: absolute;
    height: 70px;
    width: 90%;
    left: 3%;
    ${
      top
        ? `
          top: 90px;
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
