import styled from "styled-components";

const SectionSplitter = styled.div`
  height: 10px;
  width: calc(100% - 40px);
  clip-path: polygon(0 0, 0 100%, 100% 0, 100% 0);
  margin-left: 10px;
  margin-right: 30px;
  background: ${({ theme }) => theme.colors.w5};
`;

export default SectionSplitter;
