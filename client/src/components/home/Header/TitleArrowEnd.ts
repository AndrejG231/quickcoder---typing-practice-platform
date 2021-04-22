import styled from "styled-components";

const TitleArrowEnd = styled.div`
  ${({ theme }) => theme.arrowObject};
  right: -109px;
  width: 160px;
  clip-path: polygon(0px 0px, 40px 0px, 0px 40px, 120px 160px, 0px 160px);
`;

export default TitleArrowEnd;
