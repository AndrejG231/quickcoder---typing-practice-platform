import styled from "styled-components";

interface props {
  template: string;
}

const Indexes = styled.div`
  background: black;
  grid-area: pages;
  height: 100%;
  display: grid;
  grid-template-columns: ${({ template }: props) => template};
`;

export default Indexes;
