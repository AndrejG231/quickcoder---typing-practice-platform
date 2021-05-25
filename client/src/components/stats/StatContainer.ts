import styled from "styled-components";

interface props {
  theme: any;
  column: boolean;
}

const StatContainer = styled.div`
  ${({ theme, column }: props) => `
    display: grid;
    align-items: center;
    background: ${theme.colors.b4};

    ${
      column
        ? `grid-template: 
            "title0 value0" 1fr
            "title1 value1" 1fr
            "title2 value2" 1fr
            "title3 value3" 1fr
            "title4 value4" 1fr
            "title5 value5" 1fr
              / 1fr 1fr;
            height: 100%;`
        : `grid-template: 
            "title0 title1 title2 title3 title4 title5 title6" 1fr
            "value0 value1 value2 value3 value4 value5 value6" 1fr
              / 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          padding: 20px;
          width: 800px;`
    }
    color: ${theme.colors.w5};
    text-align: center;
    border-radius: 20px;
    margin: 0 auto;

  `}
`;

export default StatContainer;
