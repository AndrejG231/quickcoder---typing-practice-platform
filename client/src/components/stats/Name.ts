import styled from "styled-components";

interface props {
  index: number;
}

const Name = styled.p`
  ${({ index }: props) => `
    grid-area: title${index};
  `}
`;

export default Name;
