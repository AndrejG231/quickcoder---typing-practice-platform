import styled from "styled-components";

const SchemeSelection = styled.select`
  margin: 20px 0;
  padding: 0px 40px;
  height: 36px;
  text-align: center;
  font-size: 22px;
  border: 3px solid black;
  cursor: pointer;
  &:focus{
    outline: none;
  }
`;

export default SchemeSelection;
