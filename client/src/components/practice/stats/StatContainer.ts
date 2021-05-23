import styled from "styled-components";

const StatContainer = styled.div`
  ${({ theme }) => `
     display: grid;
     padding: 20px
     align-items: center;
     background: ${theme.colors.b4};
     grid-template: 
       "title1 title2 title3 title4 title5" 1fr
       "value1 value2 value3 value4 value5" 1fr
       / 1fr 1fr 1fr 1fr 1fr;
    color: ${theme.colors.w5};
    text-align: center;
    border-radius: 20px;
    margin: 0 auto;
    width: 800px;
  `}
`;

export default StatContainer;
