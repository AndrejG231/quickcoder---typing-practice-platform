import styled from "styled-components";

const Field = styled.td`
  margin: 10px;
  background: ${({ theme }) => theme.colors.b5};
  color: ${({ theme }) => theme.colors.w5};
  border-radius: 5px;
  font-size: 22px;
  text-align: center;
  min-width: 25px;
`;

export default Field;
