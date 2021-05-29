import styled from "styled-components";

const Column = styled.th`
  font-size: 26px;
  font-weight: 900;
  height: 30px;
  background: ${({ theme }) => theme.colors.b5};
  color: ${({ theme }) => theme.colors.w5};
`;

export default Column;
