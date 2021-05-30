import styled from "styled-components";

const OverviewGrid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template:
    "stats user" 160px
    "stats recent" 1fr
    /1fr 1fr;
`;

export default OverviewGrid;
