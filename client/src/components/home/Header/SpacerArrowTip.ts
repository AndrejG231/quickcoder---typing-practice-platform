import styled from "styled-components";

const SpacerArrowTip = styled.div`
  width: 40px;
  left: -39.5px;
  clip-path: polygon(0px 40px, 40px 0px, 40px 80px);
  ${({ theme }) => theme.arrowObject}
`;

export default SpacerArrowTip;
