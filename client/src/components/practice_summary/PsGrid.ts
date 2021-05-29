import styled from "styled-components";

const PsGrid = styled.div`
  display: grid;
  grid-template:
    "nav nav" 70px
    "stats body" auto
    / 200px auto;
  max-height: 100vh;
  min-height: 100vh;
  @media screen and (max-width: 800px) {
    grid-template:
      "nav" 70px
      "body" auto
      "stats" 160px
      / 100%;
  }
`;

export default PsGrid;
