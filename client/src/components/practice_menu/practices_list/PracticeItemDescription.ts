import styled from "styled-components";

const PracticeItemDescription = styled.p`
  margin-left: 30px;
  color: ${({ theme }) => theme.colors.w5};
  font-size: 18px;
  transform: translateY(-8px);
  @media screen and (max-width: 700px) {
    font-size: 12px;
    margin-left: 10px;    
    width: 100px;
  }
`;

export default PracticeItemDescription;
