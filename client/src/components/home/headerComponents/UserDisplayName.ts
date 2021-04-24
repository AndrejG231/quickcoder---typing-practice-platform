import styled from "styled-components";

const UserDisplayName = styled.h2`
  font-family: monospace;
  text-align: center;
  font-size: 30px;
  margin-left: 30px;
  @media screen and (max-width: 700px) {
    margin-left: 0;
    transform: translateY(-10px);
    text-align: center;
  }
`;

export default UserDisplayName;
