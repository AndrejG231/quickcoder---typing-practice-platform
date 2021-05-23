import styled from "styled-components";

interface props {
  index: number;
}

const Value = styled.p`
  ${({ index }: props) => `
    grid-area: value${index};
  `}
`;

export default Value;
