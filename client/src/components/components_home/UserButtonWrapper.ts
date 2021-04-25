import styled from "styled-components";

interface props {
  isOnScreen: boolean;
}

const UserButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 100px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 20px;
  transition: 0.3s all linear;
  transform: translateX(
    ${({ isOnScreen }: props) => (isOnScreen ? 0 : "100vw")}
  );

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
