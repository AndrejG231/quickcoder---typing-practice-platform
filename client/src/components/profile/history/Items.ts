import styled from "styled-components";

const Items = styled.div`
  grid-area: items;
  overflow-y: auto;
  border: 3px solid black;
  border-bottom: 0px;
  border-right: 0px;
  width: calc(100% - 3px);
  height: calc(100% - 3px);
`;

export default Items;
