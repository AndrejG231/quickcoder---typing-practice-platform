import styled from "styled-components";

const ItemInfoText = styled.p<{ darken?: boolean; index?: boolean }>`
  ${({ theme, darken, index }) => `
    color: ${theme.colors.w5};
    font-size: 24px;
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: ${index ? 60 : 80}px;
    margin: 0;
    padding: 0;
    text-transform: capitalize;
    ${
      darken
        ? `background: ${theme.colors.b4};`
        : `background: ${theme.colors.b3};`
    }
  `}
`;

export default ItemInfoText;
