import styled from "styled-components";

const UserDisplayName = styled.h1`
  font-family: monospace;
  text-align: center;
  font-size: 30px;
  margin-left: 30px;
  @media screen and (max-width: 700px) {
    margin-left: 0;
    text-align: center;
  }
`;

export default UserDisplayName;
