import styled from "styled-components";

const Board = styled.table`
  width: 90%;
  height: calc(100vh - 150px);
  margin: auto;
  background: ${({ theme }) => theme.colors.b1};
  border-radius: 5px;
  padding: 5px;
`;

export default Board;
