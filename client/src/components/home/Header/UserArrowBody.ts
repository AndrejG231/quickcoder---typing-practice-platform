import styled from "styled-components";

const UserArrowBody = styled.div`
  ${({ theme }) => theme.arrowObject};
  right: 0;
  left: 50px;
  cursor: pointer;
`;

export default UserArrowBody;
