import styled from "styled-components";

const Indexes = styled.div`
  background: black;
  grid-area: pages;
  height: 100%;
  width: calc(100% - 3% - 19px);
  padding-left: calc(1.5% + 3px);
  padding-right: calc(1.5% + 16px);
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr 1fr 1fr 1fr;
`;

export default Indexes;
