import styled from "styled-components";

const StatContainer = styled.div`
  ${({ theme }) => `
     display: grid;
     padding: 10px
     width: 1000px;
     align-items: center;
     background: ${theme.colors.b4};
     grid-template: 
       "title1 title2 title3 title4 title5" 1fr
       "value1 value2 value3 value4 value5" 1fr
       / 1fr 1fr 1fr 1fr 1fr;
  `}
`;

export default StatContainer;
