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
  border: 7px solid ${theme.colors.b5};
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  @media screen and (max-width: 800px){
    width: (100% - 10px);
    margin: 10px 0px;
    border-left: 0px;
    border-right: 0px;
    border-radius: 0;
    padding: 0 10px;
  }
  `}
`;

export default PracticeDisplayArea;
