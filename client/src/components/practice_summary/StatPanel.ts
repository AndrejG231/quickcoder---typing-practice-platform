import styled from "styled-components";

const StatPanel = styled.div`
  padding: 0;
  padding-left: 5px;
  grid-area: stats;
  @media screen and (max-width: 800px) {
    padding-left: 0px;
  }
`;

export default StatPanel;
