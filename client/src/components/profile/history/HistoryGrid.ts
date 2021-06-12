import styled from "styled-components";

const HistoryGrid = styled.div`
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  display: grid;
  grid-template:
    "items" calc(100vh - 140px)
    "pages" 60px
    /100%;
`;

export default HistoryGrid;
