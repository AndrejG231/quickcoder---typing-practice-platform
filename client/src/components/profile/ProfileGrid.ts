import styled from "styled-components";

const ProfileGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 2px;
  grid-template:
    "nav" 60px
    "routes" 1fr
    /100%;
`;

export default ProfileGrid;
