import styled from "styled-components";

const Error = styled.span`
  background: ${({ theme }) => theme.colors.err2};
  color: ${({ theme }) => theme.colors.err1};
`;

export default Error;
