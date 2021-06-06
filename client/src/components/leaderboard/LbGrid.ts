import styled from "styled-components";

const LbGrid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template:
    "nav" 60px
    "board" auto
    / 1fr;
  gap: 10px;
`;

export default LbGrid;
