import styled from "styled-components";

const Board = styled.table`
  width: 90%;
  height: 90vh;
  margin: auto;
  background: ${({ theme }) => theme.colors.b1};
  border-radius: 5px;
  padding: 5px;
`;

export default Board;
