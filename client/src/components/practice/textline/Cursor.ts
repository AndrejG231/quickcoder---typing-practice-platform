import styled from "styled-components";

const Cursor = styled.p`
  ${({ theme }) => `
    color: ${theme.colors.w5};
    position: absolute;
    bottom: -30px;
    font-size: 30px;
    font-weight: 800;
  `}
`;

export default Cursor;
