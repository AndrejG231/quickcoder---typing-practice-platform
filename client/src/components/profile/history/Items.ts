import styled from "styled-components";

interface props {
  isOnScreen?: boolean;
}

const Items = styled.div<props>`
  transition: 0.2s all linear;
  ${({ isOnScreen }) => (!isOnScreen ? "transform: translateX(100vw)" : "")};
  grid-area: items;
  overflow-y: scroll;
  border: 3px solid black;
  border-bottom: 0px;
  border-right: 0px;
  width: calc(100% - 3px);
  height: calc(100% - 3px);
`;

export default Items;
