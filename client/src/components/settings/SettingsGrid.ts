import styled from "styled-components";

const SettingsGrid = styled.div`
  height: 100%;
  max-height: 100vh;
  width: 100%;
  display: grid;
  grid-template:
    "nav nav" 60px
    "subnav area" 1fr
    /260px 1fr;
`;

export default SettingsGrid;
