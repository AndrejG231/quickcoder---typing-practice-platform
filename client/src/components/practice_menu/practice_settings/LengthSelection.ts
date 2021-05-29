import styled from "styled-components";

const LengthSelection = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 15px;
  @media screen and (max-height: 800px){
    margin-top: 0;
  }
`;

export default LengthSelection;
