import styled from "styled-components";

interface props {
  column: boolean;
}

const columnTemp = `
  grid-template: 
    "title0 value0" 1fr
    "title1 value1" 1fr
    "title2 value2" 1fr
    "title3 value3" 1fr
    "title4 value4" 1fr
    "title5 value5" 1fr
      / 1fr 1fr;
`;

const columnSmallTemp = `
  grid-template: 
    "title0 value0 title1 value1" 1fr
    "title2 value2 title3 value3" 1fr
    "title4 value4 title5 value5" 1fr
    /1fr 1fr 1fr 1fr
`;

const rowTemp = `
  grid-template: 
    "title0 title1 title2 title3 title4 title5 title6" 1fr
    "value0 value1 value2 value3 value4 value5 value6" 1fr
      / 1fr 1fr 1fr 1fr 1fr 1fr 1fr
`;

const StatContainer = styled.div<props>`
  ${({ theme, column }) => `
    display: grid;
    align-items: center;
    background: ${theme.colors.b4};
    margin: 0 auto;
    color: ${theme.colors.w5};
    text-align: center;
    border-radius: 20px;
    margin-bottom: 20px;

    ${
      column
        ? `${columnTemp};
          height: calc(100% - 15px);
          @media screen and (max-width: 800px){
            ${columnSmallTemp};
            height: 100%;
            border-radius: 0;
            font-size: 12px;
            padding: 0 5%;
          }
        `
        : `${rowTemp};
          padding: 20px;
          width: 800px;`
    }
  `}
`;

export default StatContainer;
