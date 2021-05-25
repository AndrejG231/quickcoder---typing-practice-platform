import styled from "styled-components";

const PsGrid = styled.div`
  display: grid;
  grid-template:
    "nav nav" 70px
    "stats body" auto
    / 200px auto;
  width: 100%;
  max-height: 100vh;
  min-height: 100vh;
`;

export default PsGrid;
