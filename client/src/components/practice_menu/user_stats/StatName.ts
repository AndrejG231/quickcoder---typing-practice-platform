import styled from "styled-components";

const StatName = styled.p`
  width: calc(100% - 3px);
  height: 100%;
  line-height: 40px;
  text-align: center;
  margin: 0;
  border-right: 3px solid ${({ theme }) => theme.colors.w4};
`;

export default StatName;
