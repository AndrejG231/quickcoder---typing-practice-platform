import styled from "styled-components";

interface props {
  theme: any;
  selected: boolean;
  color: string;
  error?: boolean;
  ratio?: number;
}

const size = 25;

const Key = styled.div`
  ${({ theme, selected, color, error, ratio = 1 }: props) => `
    height: ${size}px;
    width: ${ratio * size}px;
    background: ${
      selected ? color : error ? theme.colors.err1 : theme.colors.b1
    };
    margin: 2px;
    text-align: center;
    line-height: ${size}px;
  `}
`;

export default Key;
