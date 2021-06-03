import styled from "styled-components";

type props = {
  cpm?: boolean;
  error?: boolean;
};

const PracticeBarValue = styled.p<props>`
  font-size: 38px;
  color: ${({ theme }) => theme.colors.w4};
  position: absolute;
  margin: 0;
  width: 100%;
  text-align: center;
  font-weight: 600;
  left: 0px;
  ${({ cpm, error }) => (cpm ? "bottom: 10px;" : error ? "top: 10px;" : "")};
`;

export default PracticeBarValue;
