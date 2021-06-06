import styled from "styled-components";

const RecentStatsIndex = styled.p<{ error?: boolean }>`
  color: ${({ theme }) => theme.colors.w5};
  font-size: 34px;
  position: absolute;
  right: 100%;
  ${({ error }) => (error ? "top" : "bottom")} :50%;
`;

export default RecentStatsIndex;
