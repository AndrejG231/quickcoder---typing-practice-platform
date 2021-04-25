import styled from "styled-components";

const UserButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 100px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 20px;

  @media screen and (max-width: 700px) {
    position: absolute;
    top: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    order: 1;
  }
`;

export default UserButtonWrapper;
