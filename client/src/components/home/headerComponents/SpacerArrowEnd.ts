import styled from "styled-components";

const SpacerArrowEnd = styled.div`
  ${({ theme }) => theme.arrowObject};
  width: 40px;
  right: -39.5px;
  clip-path: polygon(0px 0px, 40px 0px, 0px 40px, 40px 80px, 0px 80px);
`;

export default SpacerArrowEnd;
