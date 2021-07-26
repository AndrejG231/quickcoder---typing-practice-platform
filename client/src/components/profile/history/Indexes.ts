import styled from "styled-components";

interface props {
  template: string;
  isOnScreen?: boolean;
}

const Indexes = styled.div`
  background: black;
  grid-area: pages;
  height: 100%;
  display: grid;
  transition: 0.2s all linear;
  grid-template-columns: ${({ template }: props) => template};
  ${({ isOnScreen }) => (!isOnScreen ? "transform: translateX(-100vw)" : "")};
`;

export default Indexes;
