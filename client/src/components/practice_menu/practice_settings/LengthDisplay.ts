import styled from "styled-components";

const LengthDisplay = styled.p`
  ${({ theme }) => `
    height: 30px;
    width: 100px;
    text-align: center;
    background: ${theme.colors.w4};
    border: 3px solid ${theme.colors.b3};
    font-size: 24px;
    padding-top: 3px;
    margin: 0px 20px;
    @media screen and (max-height: 800px){
      height: 25px;
      font-size: 18px;
      line-height: 25px;
    }
  `}
`;

export default LengthDisplay;
