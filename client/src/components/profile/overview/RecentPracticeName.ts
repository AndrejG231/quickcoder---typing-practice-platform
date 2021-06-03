import styled from "styled-components";

const RecentPracticeName = styled.p`
  position: absolute;
  margin: 0;
  font-size: 22px;
  width: 100%;
  max-width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.w5};
  bottom: calc(100% + 65px);
  left: 0;
`;

export default RecentPracticeName;
