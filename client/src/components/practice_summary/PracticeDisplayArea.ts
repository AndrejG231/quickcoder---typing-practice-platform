import styled from "styled-components";

const PracticeDisplayArea = styled.div`
  ${({ theme }) => `
  margin: 20px;
  margin-left: 25px;
  overflow-y: scroll;
  padding: 0 40px;
  background: ${theme.colors.w4};
  border-radius: 20px;
  color: ${theme.colors.b5};
  font-family: 'Times New Roman', serif;
  font-size: 46px;
  `}
`;

export default PracticeDisplayArea;
