import styled from "styled-components";

const ItemsContainer = styled.div`
  position: relative;
  height: calc(100vh - 100px);
  margin-top: 20px;
  @media screen and (max-width: 700px) {
    height: calc(100vh - 300px);
  }
`;

export default ItemsContainer;
