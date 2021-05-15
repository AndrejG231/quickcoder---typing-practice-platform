import styled from "styled-components";

interface props {
  errors: number;
}

const ErrorShift = styled.div`
  width: 100%;
  transform: translateX(-${({ errors }: props) => 19.25 * errors}px);
`;

export default ErrorShift;
