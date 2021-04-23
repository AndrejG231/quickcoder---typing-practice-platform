import styled from "styled-components";

interface props {
  width?: number;
  height?: number;
  variant?: any;
  bodyWidth?: any;
  textClass?: any;
}

const ArrowButton = styled.div`
  width: ${({ width }: props) => width ?? 120}px;
  height: ${({ height }: props) => height ?? 60}px;
  background: ${({ theme }) => theme.colors.b4};
  padding-left: ${({ height }: props) => (height ? height / 2 : 30)}px;
  ${({ theme }) => theme.centerContent};
`;
export default ArrowButton;
