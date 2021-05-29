import styled from "styled-components";

interface props {
  errors: number;
}

const ErrorShift = styled.div.attrs<props>(({ errors, theme }) => ({
  style: {
    transform: `translateX(${-1 * theme.width * errors}px)`,
  },
}))<props>`
  width: 100%;
`;

export default ErrorShift;
