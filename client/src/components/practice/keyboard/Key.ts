import styled from "styled-components";

interface props {
  theme: any;
  selected: boolean;
  color: string;
  ratio?: number;
}

const size = 25;

const Key = styled.div`
  ${({ theme, selected, color, ratio = 1 }: props) => `
    height: ${size}px;
    width: ${ratio * size}px;
    background: ${selected ? color : theme.colors.b1};
    margin: 2px;
    text-align: center;
    line-height: ${size}px;
  `}
`;

export default Key;
