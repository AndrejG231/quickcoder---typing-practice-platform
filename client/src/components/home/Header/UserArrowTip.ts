import styled from "styled-components";

const UserArrowTip = styled.div`
  ${({ theme }) => theme.arrowObject};
  width: 40px;
  left: 11px;
  clip-path: polygon(0px 40px, 40px 0px, 40px 80px);
`;

export default UserArrowTip;
