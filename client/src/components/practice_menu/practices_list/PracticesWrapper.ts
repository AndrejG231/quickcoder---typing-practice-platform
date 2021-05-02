import styled from "styled-components";

const PracticesWrapper = styled.div`
  grid-area: menu;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.b3};
`;

export default PracticesWrapper;
