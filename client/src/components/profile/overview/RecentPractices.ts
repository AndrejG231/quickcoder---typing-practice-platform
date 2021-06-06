import styled from "styled-components";

const RecentPractices = styled.div`
  grid-area: recent;
  margin-top: 120px;
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 140px);
  display: grid;
  grid-template:
    "cpm0 cpm1 cpm2 cpm3 cpm4" 50%
    "line line line line line" 3px
    "err0 err1 err2 err3 err4" calc(50% - 3px)
    / 1fr 1fr 1fr 1fr 1fr;
`;

export default RecentPractices;
