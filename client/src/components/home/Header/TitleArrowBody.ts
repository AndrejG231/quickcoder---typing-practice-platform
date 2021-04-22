import styled from "styled-components";

const TitleArrowBody = styled.div`
  left: 0px;
  right: 50px;
  cursor: pointer;
  ${({ theme }) => theme.arrowObject}
`;

export default TitleArrowBody;
