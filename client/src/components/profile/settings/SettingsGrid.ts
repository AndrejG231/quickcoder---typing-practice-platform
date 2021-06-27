import styled from "styled-components";

const SettingsGrid = styled.div`
  height: 100%;
  max-height: calc(100vh - 60px);
  width: 100%;
  display: grid;
  grid-template:
    "nav area" 100%
    /260px 1fr;
`;

export default SettingsGrid;
