import styled from "styled-components";

const RecentPracticeScore = styled.p`
  position: absolute;
  top: calc(100% + 50px);
  left: 0;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.w5};
  font-weight: 700;
  font-size: 46px;
  margin: 0;
  text-decoration: underline;
`;

export default RecentPracticeScore;
