import styled from "styled-components";

interface props {
  errors: number;
}

const ErrorShift = styled.div.attrs<props>(({ errors }) => ({
  style: {
    transform: `translateX(${-19.243 * errors}px)`,
  },
}))<props>`
  width: 100%;
`;

export default ErrorShift;
