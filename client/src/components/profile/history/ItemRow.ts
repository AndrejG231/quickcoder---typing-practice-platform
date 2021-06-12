import styled from "styled-components";

const ItemRow = styled.div`
  width: 97%;
  display: grid;
  align-items: center;
  height: 80px;
  background: ${({ theme }) => theme.colors.b4};
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  margin: 10px;
`;

export default ItemRow;
