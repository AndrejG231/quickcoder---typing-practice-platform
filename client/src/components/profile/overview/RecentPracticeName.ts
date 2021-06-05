import styled from "styled-components";

const RecentPracticeName = styled.p<{ value: number }>`
  position: absolute;
  margin: 0;
  font-size: 22px;
  width: 100%;
  max-width: 100%;
  text-align: center;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.w5};
  bottom: ${({ value }) =>
    value > 10 ? "calc(100% + 20px)" : "calc(100% + 65px)"};
  left: 0;
`;

export default RecentPracticeName;
