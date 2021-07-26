import styled from "styled-components";

interface props {
  isOnScreen?: boolean;
}

const Stats = styled.div<props>`
  ${({ isOnScreen }) => (isOnScreen ? "" : "transform: translateX(-60vw)")};
  transition: 0.2s all linear;
  grid-area: stats;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: baseline;
  text-align: left;
`;

export default Stats;
