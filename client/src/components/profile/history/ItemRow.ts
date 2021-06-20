import styled from "styled-components";

interface props {
  template: string;
}

const ItemRow = styled.div`
  width: 97%;
  display: grid;
  align-items: center;
  height: 80px;
  background: ${({ theme }) => theme.colors.b4};
  grid-template-columns: ${({ template }: props) => template};
  grid-template-rows: 1fr;
  margin: 10px;
`;

export default ItemRow;
