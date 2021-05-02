import styled from "styled-components";

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template:
    "menu scores" 40%
    "menu settings" 60%
    /60% 40%;
`;

export default MenuWrapper;
